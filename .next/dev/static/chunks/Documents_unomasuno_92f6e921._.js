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
"[project]/Documents/unomasuno/components/AdminContentManager.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminContentManager
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
    subtitle: "",
    body: "",
    image_url: null,
    actions: [],
    layout_variant: "text-left",
    position: 999,
    published: true
};
function safe(v) {
    return v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w.-]+/g, "-");
}
function AdminContentManager({ section, label, initialEntries }) {
    _s();
    const [entries, setEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialEntries);
    const [id, setId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialEntries[0]?.id || "new");
    const entry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminContentManager.useMemo[entry]": ()=>id === "new" ? {
                ...empty
            } : entries.find({
                "AdminContentManager.useMemo[entry]": (e)=>e.id === id
            }["AdminContentManager.useMemo[entry]"]) || {
                ...empty
            }
    }["AdminContentManager.useMemo[entry]"], [
        id,
        entries
    ]);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(entry);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    function choose(value) {
        setId(value);
        setDraft(value === "new" ? {
            ...empty
        } : {
            ...entries.find((e)=>e.id === value) || empty
        });
        setStatus("");
    }
    function f(k, v) {
        setDraft((d)=>({
                ...d,
                [k]: v
            }));
    }
    function action(index, key, value) {
        const actions = [
            ...draft.actions || []
        ];
        while(actions.length <= index)actions.push({
            label: "",
            url: ""
        });
        actions[index] = {
            ...actions[index],
            [key]: value
        };
        f("actions", actions);
    }
    async function save() {
        setBusy(true);
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            const payload = {
                section,
                title: draft.title,
                subtitle: draft.subtitle || null,
                body: draft.body || null,
                image_url: draft.image_url || null,
                actions: (draft.actions || []).filter((a)=>a.label && a.url),
                layout_variant: draft.layout_variant || null,
                position: Number(draft.position) || 0,
                published: !!draft.published,
                updated_at: new Date().toISOString()
            };
            let row;
            if (draft.id) {
                const { data, error } = await supabase.from("content_entries").update(payload).eq("id", draft.id).select("*").single();
                if (error) throw error;
                row = data;
                setEntries((es)=>es.map((e)=>e.id === row.id ? row : e));
            } else {
                const { data, error } = await supabase.from("content_entries").insert(payload).select("*").single();
                if (error) throw error;
                row = data;
                setEntries((es)=>[
                        ...es,
                        row
                    ]);
                setId(row.id);
            }
            setDraft(row);
            setStatus("Guardado correctamente.");
        } catch (e) {
            setStatus(`Error: ${e.message || e}`);
        } finally{
            setBusy(false);
        }
    }
    async function upload(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        setBusy(true);
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            const p = `${section}/${Date.now()}-${safe(file.name)}`;
            const { error } = await supabase.storage.from("site-content").upload(p, file, {
                contentType: file.type || undefined
            });
            if (error) throw error;
            f("image_url", supabase.storage.from("site-content").getPublicUrl(p).data.publicUrl);
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
                        className: id === "new" ? "active" : "",
                        children: "+ Nuevo"
                    }, void 0, false, {
                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                        lineNumber: 15,
                        columnNumber: 85
                    }, this),
                    entries.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>choose(e.id),
                            className: id === e.id ? "active" : "",
                            children: [
                                e.title,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                    children: e.published ? "Publicado" : "Borrador"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                    lineNumber: 15,
                                    columnNumber: 277
                                }, this)
                            ]
                        }, e.id, true, {
                            fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                            lineNumber: 15,
                            columnNumber: 188
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                lineNumber: 15,
                columnNumber: 47
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "admin-card admin-editor",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "admin-editor-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 427
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "primary",
                                onClick: save,
                                disabled: busy,
                                children: "Guardar"
                            }, void 0, false, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 443
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                        lineNumber: 15,
                        columnNumber: 392
                    }, this),
                    status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "admin-status",
                        children: status
                    }, void 0, false, {
                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                        lineNumber: 15,
                        columnNumber: 533
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
                                        onChange: (e)=>f("title", e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                        lineNumber: 15,
                                        columnNumber: 644
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 607
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field",
                                children: [
                                    "Subtítulo",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: draft.subtitle || "",
                                        onChange: (e)=>f("subtitle", e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                        lineNumber: 15,
                                        columnNumber: 764
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 724
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field",
                                children: [
                                    "Orden",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: draft.position || 0,
                                        onChange: (e)=>f("position", e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                        lineNumber: 15,
                                        columnNumber: 886
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 850
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field",
                                children: [
                                    "Layout",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: draft.layout_variant || "text-left",
                                        onChange: (e)=>f("layout_variant", e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "text-left",
                                                children: "Texto izquierda"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                                lineNumber: 15,
                                                columnNumber: 1121
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "image-left",
                                                children: "Imagen izquierda"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                                lineNumber: 15,
                                                columnNumber: 1171
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "intro",
                                                children: "Introducción"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                                lineNumber: 15,
                                                columnNumber: 1223
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "person",
                                                children: "Persona"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                                lineNumber: 15,
                                                columnNumber: 1266
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                        lineNumber: 15,
                                        columnNumber: 1022
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 985
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field admin-field-wide",
                                children: [
                                    "Texto",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: draft.body || "",
                                        onChange: (e)=>f("body", e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                        lineNumber: 15,
                                        columnNumber: 1375
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 1322
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                        lineNumber: 15,
                        columnNumber: 574
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "admin-upload-box admin-upload-wide",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Imagen"
                            }, void 0, false, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 1514
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Editorial: ideal 1600 px o más. Personas: retrato cuadrado 1200×1200 px."
                            }, void 0, false, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 1529
                            }, this),
                            draft.image_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: draft.image_url,
                                alt: ""
                            }, void 0, false, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 1626
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                accept: "image/*",
                                onChange: upload
                            }, void 0, false, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 1662
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                        lineNumber: 15,
                        columnNumber: 1462
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "admin-form-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field",
                                children: [
                                    "Botón 1",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        placeholder: "Ver publicación",
                                        value: draft.actions?.[0]?.label || "",
                                        onChange: (e)=>action(0, "label", e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                        lineNumber: 15,
                                        columnNumber: 1794
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 1756
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field",
                                children: [
                                    "URL botón 1",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: draft.actions?.[0]?.url || "",
                                        onChange: (e)=>action(0, "url", e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                        lineNumber: 15,
                                        columnNumber: 1967
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 1925
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field",
                                children: [
                                    "Botón 2",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        placeholder: "Ver catálogo",
                                        value: draft.actions?.[1]?.label || "",
                                        onChange: (e)=>action(1, "label", e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                        lineNumber: 15,
                                        columnNumber: 2102
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 2064
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "admin-field",
                                children: [
                                    "URL botón 2",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: draft.actions?.[1]?.url || "",
                                        onChange: (e)=>action(1, "url", e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                        lineNumber: 15,
                                        columnNumber: 2272
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 2230
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                        lineNumber: 15,
                        columnNumber: 1723
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "admin-check",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$unomasuno$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: !!draft.published,
                                onChange: (e)=>f("published", e.target.checked)
                            }, void 0, false, {
                                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                                lineNumber: 15,
                                columnNumber: 2406
                            }, this),
                            " Publicado"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                        lineNumber: 15,
                        columnNumber: 2375
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
                lineNumber: 15,
                columnNumber: 347
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/unomasuno/components/AdminContentManager.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
_s(AdminContentManager, "a0Sm+wjbeSbV94K/uBpdbvBRYnU=");
_c = AdminContentManager;
var _c;
__turbopack_context__.k.register(_c, "AdminContentManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_unomasuno_92f6e921._.js.map