<?php
/**
 * Ejecutar DESDE el Local Site Shell, en app/public:
 * wp eval-file C:\ruta\export-wordpress-sections.php
 *
 * Genera:
 * wp-content/uploads/unomasuno-export/
 *   menciones.json
 *   academia.json
 *   nosotros.json
 *   images/...
 */

if (!defined('ABSPATH')) {
    fwrite(STDERR, "Ejecutar con WP-CLI: wp eval-file ...\n");
    exit(1);
}

$out = WP_CONTENT_DIR . '/uploads/unomasuno-export';
$imgOut = $out . '/images';

if (!is_dir($out)) wp_mkdir_p($out);
if (!is_dir($imgOut)) wp_mkdir_p($imgOut);

function umo_flatten($value, &$strings) {
    if (is_array($value)) {
        foreach ($value as $v) umo_flatten($v, $strings);
    } elseif (is_object($value)) {
        foreach (get_object_vars($value) as $v) umo_flatten($v, $strings);
    } elseif (is_scalar($value)) {
        $strings[] = (string)$value;
    }
}

function umo_urls_from_strings($strings) {
    $urls = [];
    foreach ($strings as $s) {
        if (preg_match_all('~https?://[^"\'\s<>)\\\\]+~i', $s, $m)) {
            foreach ($m[0] as $url) {
                $url = html_entity_decode(stripslashes($url));
                if (preg_match('~\.(?:jpg|jpeg|png|webp|gif|svg)(?:\?.*)?$~i', $url)) {
                    $urls[$url] = true;
                }
            }
        }
    }
    return array_keys($urls);
}

function umo_copy_url($url, $imgOut) {
    $uploads = wp_upload_dir();
    $baseurl = $uploads['baseurl'];
    $basedir = $uploads['basedir'];

    $normalized = preg_replace('~^http://~i', 'https://', $url);
    $baseNorm = preg_replace('~^http://~i', 'https://', $baseurl);

    if (strpos($normalized, $baseNorm) !== 0) return null;

    $rel = ltrim(substr($normalized, strlen($baseNorm)), '/');
    $src = $basedir . '/' . str_replace('/', DIRECTORY_SEPARATOR, $rel);

    if (!file_exists($src)) return null;

    $filename = sanitize_file_name(basename(parse_url($src, PHP_URL_PATH) ?: $src));
    $dest = trailingslashit($imgOut) . $filename;

    $n = 2;
    $info = pathinfo($filename);
    while (file_exists($dest)) {
        $dest = trailingslashit($imgOut) .
            $info['filename'] . '-' . $n . (isset($info['extension']) ? '.' . $info['extension'] : '');
        $n++;
    }

    copy($src, $dest);
    return basename($dest);
}

foreach (['menciones', 'academia', 'nosotros'] as $slug) {
    $page = get_page_by_path($slug, OBJECT, 'page');

    if (!$page) {
        echo "No encontrada página: {$slug}\n";
        continue;
    }

    $strings = [$page->post_content, $page->post_excerpt, $page->post_title];

    $meta = get_post_meta($page->ID);
    foreach ($meta as $key => $values) {
        foreach ($values as $raw) {
            $value = maybe_unserialize($raw);
            umo_flatten($value, $strings);
        }
    }

    $urls = umo_urls_from_strings($strings);
    $copied = [];

    foreach ($urls as $url) {
        $file = umo_copy_url($url, $imgOut);
        if ($file) $copied[] = ['original_url' => $url, 'file' => $file];
    }

    $data = [
        'id' => $page->ID,
        'slug' => $slug,
        'title' => $page->post_title,
        'content' => $page->post_content,
        'excerpt' => $page->post_excerpt,
        'meta' => $meta,
        'images' => $copied,
    ];

    file_put_contents(
        $out . '/' . $slug . '.json',
        wp_json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
    );

    echo strtoupper($slug) . ": " . count($copied) . " imágenes exportadas\n";
}

echo "\nExport listo en:\n{$out}\n";
