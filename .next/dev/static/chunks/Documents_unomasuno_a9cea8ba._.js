(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/unomasuno/lib/supabase-browser.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/unomasuno/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/unomasuno/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/unomasuno/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://fgmfqmxqgggbhyztemih.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnbWZxbXhxZ2dnYmh5enRlbWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxODAxNzMsImV4cCI6MjEwNTc1NjE3M30.X6v0kM9GLojbKr7p0qcaIjlCjPVL8hzBX-C0QMsfSPs"));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/unomasuno/components/AdminSignOut.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminSignOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/unomasuno/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Documents/unomasuno/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/unomasuno/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/unomasuno/lib/supabase-browser.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AdminSignOut() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: "admin-nav-button",
        onClick: async ()=>{
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])().auth.signOut();
            router.replace("/admin/login");
            router.refresh();
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                size: 16
            }, void 0, false, {
                fileName: "[project]/Documents/unomasuno/components/AdminSignOut.tsx",
                lineNumber: 7,
                columnNumber: 155
            }, this),
            " Salir"
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/unomasuno/components/AdminSignOut.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_s(AdminSignOut, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AdminSignOut;
var _c;
__turbopack_context__.k.register(_c, "AdminSignOut");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/unomasuno/components/AdminProjectManager.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminProjectManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/unomasuno/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/unomasuno/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/unomasuno/lib/supabase-browser.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const empty = {
    id: "",
    title: "",
    slug: "",
    location: "",
    area: "",
    year: null,
    description: "",
    cover_image: null,
    hero_image: null,
    sketch_image: null,
    likes_count: 0,
    position: 999,
    featured: false,
    published: true,
    created_at: "",
    updated_at: "",
    images: []
};
function slugify(v) {
    return v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function safe(v) {
    return v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w.-]+/g, "-");
}
function AdminProjectManager({ initialProjects }) {
    _s();
    const [projects, setProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialProjects);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialProjects[0]?.id || "new");
    const selected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminProjectManager.useMemo[selected]": ()=>selectedId === "new" ? {
                ...empty
            } : projects.find({
                "AdminProjectManager.useMemo[selected]": (p)=>p.id === selectedId
            }["AdminProjectManager.useMemo[selected]"]) || {
                ...empty
            }
    }["AdminProjectManager.useMemo[selected]"], [
        selectedId,
        projects
    ]);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(selected);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    function choose(id) {
        setSelectedId(id);
        const p = id === "new" ? {
            ...empty
        } : projects.find((x)=>x.id === id) || {
            ...empty
        };
        setDraft({
            ...p
        });
        setStatus("");
    }
    function field(name, value) {
        setDraft((d)=>({
                ...d,
                [name]: value,
                ...name === "title" && !d.id && !d.slug ? {
                    slug: slugify(value)
                } : {}
            }));
    }
    async function upload(file, kind, projectId, slug) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const storagePath = `${slug}/${kind}/${Date.now()}-${safe(file.name)}`;
        const { error } = await supabase.storage.from("projects").upload(storagePath, file, {
            upsert: false,
            contentType: file.type || undefined
        });
        if (error) throw error;
        const url = supabase.storage.from("projects").getPublicUrl(storagePath).data.publicUrl;
        if (kind === "gallery") {
            const max = Math.max(-1, ...(draft.images || []).map((i)=>i.position || 0));
            const { data, error: e } = await supabase.from("project_images").insert({
                project_id: projectId,
                image_url: url,
                position: max + 1
            }).select("*").single();
            if (e) throw e;
            setDraft((d)=>({
                    ...d,
                    images: [
                        ...d.images || [],
                        data
                    ]
                }));
        } else {
            const col = kind === "sketch" ? "sketch_image" : "hero_image";
            const patch = {
                [col]: url,
                updated_at: new Date().toISOString()
            };
            if (kind === "hero" && !draft.cover_image) patch.cover_image = url;
            const { error: e } = await supabase.from("projects").update(patch).eq("id", projectId);
            if (e) throw e;
            setDraft((d)=>({
                    ...d,
                    ...patch
                }));
        }
        return url;
    }
    async function save() {
        setBusy(true);
        setStatus("");
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            const payload = {
                title: draft.title,
                slug: draft.slug || slugify(draft.title),
                location: draft.location || null,
                area: draft.area || null,
                year: draft.year ? Number(draft.year) : null,
                description: draft.description || null,
                position: Number(draft.position) || 0,
                featured: Boolean(draft.featured),
                published: Boolean(draft.published),
                updated_at: new Date().toISOString()
            };
            let row;
            if (draft.id) {
                const { data, error } = await supabase.from("projects").update(payload).eq("id", draft.id).select("*").single();
                if (error) throw error;
                row = {
                    ...draft,
                    ...data
                };
                setProjects((ps)=>ps.map((p)=>p.id === row.id ? row : p));
            } else {
                const { data, error } = await supabase.from("projects").insert(payload).select("*").single();
                if (error) throw error;
                row = {
                    ...data,
                    images: []
                };
                setProjects((ps)=>[
                        ...ps,
                        row
                    ]);
                setSelectedId(row.id);
            }
            setDraft(row);
            setStatus("Guardado correctamente.");
        } catch (e) {
            setStatus(`Error: ${e.message || e}`);
        } finally{
            setBusy(false);
        }
    }
    async function removeImage(image) {
        if (!confirm("¿Quitar esta imagen de la galería?")) return;
        const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])().from("project_images").delete().eq("id", image.id);
        if (!error) setDraft((d)=>({
                ...d,
                images: (d.images || []).filter((x)=>x.id !== image.id)
            }));
    }
    async function fileChange(e, kind) {
        if (!draft.id) {
            alert("Primero guardá el proyecto y luego subí imágenes.");
            e.target.value = "";
            return;
        }
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        setBusy(true);
        try {
            for (const file of files)await upload(file, kind, draft.id, draft.slug);
        } catch (err) {
            alert(err.message || err);
        } finally{
            setBusy(false);
            e.target.value = "";
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "admin-project-layout",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "admin-project-list",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>choose("new"),
                        className: selectedId === "new" ? "active" : "",
                        children: "+ Nuevo proyecto"
                    }, void 0, false, {
                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                        lineNumber: 23,
                        columnNumber: 86
                    }, this),
                    projects.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>choose(p.id),
                            className: selectedId === p.id ? "active" : "",
                            children: [
                                p.title,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                    children: p.published ? "Publicado" : "Borrador"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                    lineNumber: 23,
                                    columnNumber: 304
                                }, this)
                            ]
                        }, p.id, true, {
                            fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                            lineNumber: 23,
                            columnNumber: 207
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                lineNumber: 23,
                columnNumber: 48
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "admin-card admin-editor",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "admin-editor-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                children: draft.id ? `Editar ${draft.title}` : "Nuevo proyecto"
                            }, void 0, false, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 454
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "primary",
                                onClick: save,
                                disabled: busy,
                                children: busy ? "Guardando..." : "Guardar"
                            }, void 0, false, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 514
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                        lineNumber: 23,
                        columnNumber: 419
                    }, this),
                    status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "admin-status",
                        children: status
                    }, void 0, false, {
                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                        lineNumber: 23,
                        columnNumber: 628
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "admin-form-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field",
                                children: [
                                    "Título",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: draft.title || "",
                                        onChange: (e)=>field("title", e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 739
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 702
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field",
                                children: [
                                    "Slug",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: draft.slug || "",
                                        onChange: (e)=>field("slug", slugify(e.target.value))
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 858
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 823
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field",
                                children: [
                                    "Ubicación",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: draft.location || "",
                                        onChange: (e)=>field("location", e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 989
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 949
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field",
                                children: [
                                    "Superficie",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        placeholder: "250 m2",
                                        value: draft.area || "",
                                        onChange: (e)=>field("area", e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 1120
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 1079
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field",
                                children: [
                                    "Año",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: draft.year || "",
                                        onChange: (e)=>field("year", e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 1257
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 1223
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field",
                                children: [
                                    "Orden",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: draft.position || 0,
                                        onChange: (e)=>field("position", e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 1389
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 1353
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field admin-field-wide",
                                children: [
                                    "Descripción",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: draft.description || "",
                                        onChange: (e)=>field("description", e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 1551
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 1492
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                        lineNumber: 23,
                        columnNumber: 669
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "admin-checks",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: !!draft.published,
                                        onChange: (e)=>field("published", e.target.checked)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 1693
                                    }, this),
                                    " Publicado"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 1686
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: !!draft.featured,
                                        onChange: (e)=>field("featured", e.target.checked)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 1820
                                    }, this),
                                    " Destacado"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 1813
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Likes actuales: ",
                                    draft.likes_count || 0
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 1938
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                        lineNumber: 23,
                        columnNumber: 1656
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "admin-media-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "admin-upload-box",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Croquis / miniatura"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 2063
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Ideal: PNG/JPG 1400×1000 px, fondo blanco o transparente."
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 2091
                                    }, this),
                                    draft.sketch_image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: draft.sketch_image,
                                        alt: "Croquis"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 2176
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: "image/*",
                                        onChange: (e)=>fileChange(e, "sketch")
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 2222
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 2029
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "admin-upload-box",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Hero"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 2336
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Ideal: 2400×1400 px o mayor, horizontal."
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 2349
                                    }, this),
                                    draft.hero_image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: draft.hero_image,
                                        alt: "Hero"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 2415
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: "image/*",
                                        onChange: (e)=>fileChange(e, "hero")
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 2456
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 2302
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                        lineNumber: 23,
                        columnNumber: 1995
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "admin-gallery",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "admin-gallery-head",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Galería"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                                lineNumber: 23,
                                                columnNumber: 2612
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Ideal: mínimo 1600 px en el lado mayor. Se respeta el orden de carga."
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                                lineNumber: 23,
                                                columnNumber: 2628
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 2607
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        multiple: true,
                                        accept: "image/*",
                                        onChange: (e)=>fileChange(e, "gallery")
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 2710
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 2571
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "admin-gallery-grid",
                                children: (draft.images || []).map((img)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "admin-gallery-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: img.image_url,
                                                alt: ""
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                                lineNumber: 23,
                                                columnNumber: 2929
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>removeImage(img),
                                                children: "Quitar"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                                lineNumber: 23,
                                                columnNumber: 2962
                                            }, this)
                                        ]
                                    }, img.id, true, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                        lineNumber: 23,
                                        columnNumber: 2880
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                                lineNumber: 23,
                                columnNumber: 2800
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                        lineNumber: 23,
                        columnNumber: 2540
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
                lineNumber: 23,
                columnNumber: 374
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/unomasuno/components/AdminProjectManager.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, this);
}
_s(AdminProjectManager, "anXLfy3Xbg+G1oZmZSYbJ26Ez5g=");
_c = AdminProjectManager;
var _c;
__turbopack_context__.k.register(_c, "AdminProjectManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_unomasuno_a9cea8ba._.js.map