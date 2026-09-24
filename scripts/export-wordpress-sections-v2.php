<?php
/**
 * UNO MÁS UNO - Exportador V2
 *
 * Ejecutar desde Local Site Shell, ubicado en app/public:
 *
 * wp eval-file "C:\Users\Nicolás\Documents\unomasuno\scripts\export-wordpress-sections-v2.php"
 *
 * Exporta imágenes reales renderizadas en:
 * wp-content/uploads/unomasuno-export-v2/
 */

if (!defined('ABSPATH')) {
    fwrite(STDERR, "Ejecutar con WP-CLI usando wp eval-file.\n");
    exit(1);
}

$out = WP_CONTENT_DIR . '/uploads/unomasuno-export-v2';
$imgOut = $out . '/images';

if (!is_dir($out)) {
    wp_mkdir_p($out);
}
if (!is_dir($imgOut)) {
    wp_mkdir_p($imgOut);
}

function umo_v2_normalize_url($url) {
    $url = html_entity_decode($url);
    $url = stripslashes($url);
    $url = trim($url, " \t\n\r\0\x0B\"'");

    // Evitar data URIs
    if (stripos($url, 'data:') === 0) {
        return null;
    }

    return $url;
}

function umo_v2_extract_urls_from_html($html) {
    $urls = [];

    // src=""
    if (preg_match_all('/<img[^>]+src=["\']([^"\']+)["\']/i', $html, $m)) {
        foreach ($m[1] as $url) {
            $url = umo_v2_normalize_url($url);
            if ($url) $urls[$url] = true;
        }
    }

    // srcset=""
    if (preg_match_all('/<img[^>]+srcset=["\']([^"\']+)["\']/i', $html, $m)) {
        foreach ($m[1] as $srcset) {
            foreach (explode(',', $srcset) as $candidate) {
                $candidate = trim($candidate);
                $parts = preg_split('/\s+/', $candidate);
                if (!empty($parts[0])) {
                    $url = umo_v2_normalize_url($parts[0]);
                    if ($url) $urls[$url] = true;
                }
            }
        }
    }

    return array_keys($urls);
}

function umo_v2_local_path_from_url($url) {
    $uploads = wp_upload_dir();

    $baseUrlVariants = [
        $uploads['baseurl'],
        preg_replace('~^https://~i', 'http://', $uploads['baseurl']),
        preg_replace('~^http://~i', 'https://', $uploads['baseurl']),
    ];

    foreach ($baseUrlVariants as $baseurl) {
        if (strpos($url, $baseurl) === 0) {
            $relative = ltrim(substr($url, strlen($baseurl)), '/');
            return trailingslashit($uploads['basedir']) . str_replace('/', DIRECTORY_SEPARATOR, $relative);
        }
    }

    // Fallback: cualquier URL que contenga /wp-content/uploads/
    $needle = '/wp-content/uploads/';
    $pos = strpos($url, $needle);

    if ($pos !== false) {
        $relative = substr($url, $pos + strlen($needle));
        return trailingslashit($uploads['basedir']) . str_replace('/', DIRECTORY_SEPARATOR, $relative);
    }

    return null;
}

function umo_v2_original_candidate($path) {
    if (!$path) return null;

    // Si es una miniatura tipo -368x500.jpg, intentar primero el original.
    $original = preg_replace('/-\d+x\d+(?=\.[^.]+$)/', '', $path);

    if ($original && file_exists($original)) {
        return $original;
    }

    return file_exists($path) ? $path : null;
}

function umo_v2_copy_unique($src, $destDir) {
    if (!$src || !file_exists($src)) return null;

    $filename = sanitize_file_name(basename($src));
    $dest = trailingslashit($destDir) . $filename;

    if (file_exists($dest)) {
        // Si ya existe el mismo archivo, reutilizar nombre.
        if (filesize($dest) === filesize($src)) {
            return basename($dest);
        }

        $info = pathinfo($filename);
        $n = 2;
        do {
            $candidate =
                $info['filename'] .
                '-' . $n .
                (isset($info['extension']) ? '.' . $info['extension'] : '');
            $dest = trailingslashit($destDir) . $candidate;
            $n++;
        } while (file_exists($dest));
    }

    if (!copy($src, $dest)) {
        return null;
    }

    return basename($dest);
}

function umo_v2_get_rendered_html($page) {
    $permalink = get_permalink($page);

    // 1) Intentar HTML ya renderizado por WordPress vía HTTP local
    $response = wp_remote_get($permalink, [
        'timeout' => 30,
        'sslverify' => false,
        'redirection' => 5,
    ]);

    if (!is_wp_error($response)) {
        $code = wp_remote_retrieve_response_code($response);
        $body = wp_remote_retrieve_body($response);

        if ($code >= 200 && $code < 400 && !empty($body)) {
            return $body;
        }
    }

    // 2) Fallback: contenido filtrado
    return apply_filters('the_content', $page->post_content);
}

$sections = [
    'menciones',
    'academia',
    'nosotros',
];

foreach ($sections as $slug) {
    $page = get_page_by_path($slug, OBJECT, 'page');

    if (!$page) {
        echo "NO ENCONTRADA: {$slug}\n";
        continue;
    }

    echo "\n===============================\n";
    echo strtoupper($slug) . "\n";
    echo "Página ID: {$page->ID}\n";

    $html = umo_v2_get_rendered_html($page);
    $urls = umo_v2_extract_urls_from_html($html);

    echo "IMG URLs detectadas: " . count($urls) . "\n";

    $copied = [];
    $seenOriginals = [];

    foreach ($urls as $url) {
        $local = umo_v2_local_path_from_url($url);
        $local = umo_v2_original_candidate($local);

        if (!$local) {
            // Ignorar assets externos del theme, iconos, etc.
            continue;
        }

        $key = strtolower(str_replace('\\', '/', $local));
        if (isset($seenOriginals[$key])) {
            continue;
        }
        $seenOriginals[$key] = true;

        $file = umo_v2_copy_unique($local, $imgOut);

        if ($file) {
            $copied[] = [
                'original_url' => $url,
                'local_source' => $local,
                'file' => $file,
            ];

            echo "  ✓ {$file}\n";
        }
    }

    $data = [
        'id' => $page->ID,
        'slug' => $slug,
        'title' => $page->post_title,
        'permalink' => get_permalink($page),
        'content' => $page->post_content,
        'rendered_html' => $html,
        'images' => $copied,
    ];

    file_put_contents(
        $out . '/' . $slug . '.json',
        wp_json_encode(
            $data,
            JSON_PRETTY_PRINT |
            JSON_UNESCAPED_UNICODE |
            JSON_UNESCAPED_SLASHES
        )
    );

    echo "TOTAL COPIADAS: " . count($copied) . "\n";
}

echo "\n================================\n";
echo "EXPORT V2 LISTO\n";
echo $out . "\n";
echo "================================\n";
