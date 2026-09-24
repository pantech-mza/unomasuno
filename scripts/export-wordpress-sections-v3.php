<?php
/**
 * UNO MÁS UNO - Exportador estructural V3
 *
 * Ejecutar:
 * wp eval-file "C:\Users\Nicolás\Documents\unomasuno\scripts\export-wordpress-sections-v3.php"
 *
 * Extrae:
 * - HTML renderizado
 * - secciones BeTheme en orden
 * - textos
 * - imágenes
 * - TODOS los enlaces y botones con su href real
 */

if (!defined('ABSPATH')) {
    fwrite(STDERR, "Ejecutar con WP-CLI usando wp eval-file.\n");
    exit(1);
}

$out = WP_CONTENT_DIR . '/uploads/unomasuno-export-v3';
if (!is_dir($out)) wp_mkdir_p($out);

function umo_v3_render_page($page) {
    $url = get_permalink($page);

    $response = wp_remote_get($url, [
        'timeout' => 30,
        'sslverify' => false,
        'redirection' => 5,
    ]);

    if (!is_wp_error($response)) {
        $code = wp_remote_retrieve_response_code($response);
        $body = wp_remote_retrieve_body($response);
        if ($code >= 200 && $code < 400 && $body) return $body;
    }

    return apply_filters('the_content', $page->post_content);
}

function umo_v3_dom($html) {
    libxml_use_internal_errors(true);
    $dom = new DOMDocument('1.0', 'UTF-8');
    $dom->loadHTML(
        '<?xml encoding="utf-8" ?>' . $html,
        LIBXML_NOWARNING | LIBXML_NOERROR
    );
    libxml_clear_errors();
    return $dom;
}

function umo_v3_text($node) {
    return trim(preg_replace('/\s+/u', ' ', $node->textContent ?? ''));
}

function umo_v3_attrs($node) {
    $out = [];
    if (!$node->hasAttributes()) return $out;
    foreach ($node->attributes as $attr) {
        $out[$attr->nodeName] = $attr->nodeValue;
    }
    return $out;
}

function umo_v3_descendant_data($node) {
    $dom = $node->ownerDocument;
    $xpath = new DOMXPath($dom);

    $images = [];
    foreach ($xpath->query('.//img', $node) as $img) {
        $src = $img->getAttribute('src');
        if (!$src) continue;

        $images[] = [
            'src' => html_entity_decode($src),
            'srcset' => html_entity_decode($img->getAttribute('srcset')),
            'alt' => $img->getAttribute('alt'),
            'width' => $img->getAttribute('width'),
            'height' => $img->getAttribute('height'),
        ];
    }

    $links = [];
    foreach ($xpath->query('.//a[@href]', $node) as $a) {
        $href = html_entity_decode($a->getAttribute('href'));
        $label = umo_v3_text($a);

        if (!$label) {
            $img = $xpath->query('.//img', $a)->item(0);
            if ($img) $label = $img->getAttribute('alt');
        }

        $links[] = [
            'label' => $label,
            'href' => $href,
            'class' => $a->getAttribute('class'),
            'target' => $a->getAttribute('target'),
        ];
    }

    $headings = [];
    foreach ($xpath->query('.//h1|.//h2|.//h3|.//h4|.//h5|.//h6', $node) as $h) {
        $text = umo_v3_text($h);
        if ($text) $headings[] = $text;
    }

    $paragraphs = [];
    foreach ($xpath->query('.//p', $node) as $p) {
        $text = umo_v3_text($p);
        if ($text) $paragraphs[] = $text;
    }

    return [
        'text' => umo_v3_text($node),
        'headings' => array_values(array_unique($headings)),
        'paragraphs' => array_values(array_unique($paragraphs)),
        'images' => $images,
        'links' => $links,
    ];
}

foreach (['menciones', 'academia', 'nosotros'] as $slug) {
    $page = get_page_by_path($slug, OBJECT, 'page');

    if (!$page) {
        echo "NO ENCONTRADA: {$slug}\n";
        continue;
    }

    $html = umo_v3_render_page($page);
    $dom = umo_v3_dom($html);
    $xpath = new DOMXPath($dom);

    // Buscar contenido principal de BeTheme.
    $content = $xpath->query('//*[@id="Content"]')->item(0);
    if (!$content) {
        $content = $xpath->query('//body')->item(0);
    }

    // Secciones principales de BeTheme.
    $sections = $xpath->query(
        './/*[contains(concat(" ", normalize-space(@class), " "), " section ")]',
        $content
    );

    $blocks = [];

    foreach ($sections as $index => $section) {
        $data = umo_v3_descendant_data($section);

        // Ignorar secciones completamente vacías.
        if (
            !$data['text'] &&
            empty($data['images']) &&
            empty($data['links'])
        ) {
            continue;
        }

        $blocks[] = [
            'position' => count($blocks) + 1,
            'class' => $section->getAttribute('class'),
            'id' => $section->getAttribute('id'),
            'data' => $data,
        ];
    }

    // Además exportar todos los links de la página en orden.
    $allLinks = [];
    foreach ($xpath->query('.//a[@href]', $content) as $a) {
        $href = html_entity_decode($a->getAttribute('href'));
        $label = umo_v3_text($a);

        if (!$href) continue;

        $allLinks[] = [
            'label' => $label,
            'href' => $href,
            'class' => $a->getAttribute('class'),
        ];
    }

    $payload = [
        'page' => [
            'id' => $page->ID,
            'slug' => $slug,
            'title' => $page->post_title,
            'permalink' => get_permalink($page),
        ],
        'blocks' => $blocks,
        'links' => $allLinks,
        'rendered_html' => $html,
    ];

    file_put_contents(
        $out . '/' . $slug . '-structure.json',
        wp_json_encode(
            $payload,
            JSON_PRETTY_PRINT |
            JSON_UNESCAPED_UNICODE |
            JSON_UNESCAPED_SLASHES
        )
    );

    echo strtoupper($slug) . ": " . count($blocks) . " secciones / " . count($allLinks) . " links\n";

    foreach ($allLinks as $link) {
        $label = $link['label'] ?: '[sin texto]';
        echo "  LINK: {$label} -> {$link['href']}\n";
    }
}

echo "\nEXPORT V3 LISTO:\n{$out}\n";
