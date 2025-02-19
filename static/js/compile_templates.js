(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["admin.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!DOCTYPE html>\n<html lang=\"en\" data-bs-theme=\"dark\">\n\n<head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\" />\n    <meta name=\"description\" content=\"\" />\n    <meta name=\"author\" content=\"\" />\n    <title>DK64 Randomizer</title>\n    <link href=\"./static/img/dk.png\" rel=\"icon\" />\n    <script src=\"https://use.fontawesome.com/releases/v5.15.4/js/all.js\" crossorigin=\"anonymous\"></script>\n    <link href=\"https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900\" rel=\"stylesheet\" />\n    <link href=\"https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i\" rel=\"stylesheet\" />\n    <link href=\"static/styles/styles.css\" rel=\"stylesheet\" />\n    <link href=\"./static/styles/gui.css\" rel=\"stylesheet\" type=\"text/css\" />\n    <script src=\"https://code.jquery.com/jquery-3.7.1.min.js\" integrity=\"sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=\" crossorigin=\"anonymous\"></script>\n</head>\n\n<body id=\"page-top\">\n    <nav class=\"navbar navbar-expand-lg navbar-dark navbar-custom fixed-top\">\n        <div class=\"container px-5\">\n            <a class=\"navbar-brand\" href=\"#page-top\">DK64 Randomizer</a>\n            <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarResponsive\" aria-controls=\"navbarResponsive\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n                <span class=\"navbar-toggler-icon\"></span>\n            </button>\n            <div class=\"collapse navbar-collapse\" id=\"navbarResponsive\">\n                <ul class=\"navbar-nav ms-auto\">\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"./\">Overview</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"./wiki/Consoles-and-Emulators.html\">Setup</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"./wiki/home.html\">Wiki</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"https://discord.dk64randomizer.com\" target=\"_blank\">Discord</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </nav>\n    <header class=\"masthead text-center\">\n        <div class=\"masthead-content\">\n            <div class=\"card\" style=\"margin-top: 20px;\">\n                <div class=\"tab-content\">\n                    <div class=\"col border pb-3\">\n                        <h2 class=\"title\">Local Presets</h2>\n                        <div>\n                            Presets stored locally to the server, by entering a name, description, and settings string you can save a preset to the server to be used later.\n                        </div>\n                        <div>\n                            The value in Name is the only one that matters for deletion or creation, the preset dropdown just helps you select the preset you want to edit.\n                        </div>\n                        <div class=\"flex-container\" style=\"justify-content: center;\">\n                            <div class=\"item-select\">\n                                <label for=\"branch\" class=\"select-title\">Branch</label>\n                                <select class=\"form-select\" id=\"branch\">\n                                    <option value=\"\" disabled selected>Select a branch</option>\n                                    <option value=\"stable\">Master</option>\n                                    <option value=\"dev\">Dev</option>\n                                </select>\n                            </div>\n                            <div class=\"item-select\">\n                                <label for=\"presets\" class=\"select-title\">Presets</label>\n                                <select class=\"form-select\" id=\"presets\" disabled>\n                                    <option value=\"\" disabled selected>Select a preset</option>\n                                </select>\n                                <div style=\"display: flex; justify-content: space-evenly; padding-top: 10px;\">\n                                    <a id=\"raise_button\" class=\"btn btn-neutral\" disabled onClick=\"move_preset(true)\"><i class=\"fa fa-arrow-up\"></i></a>\n                                    <a id=\"lower_button\" class=\"btn btn-neutral\" disabled onClick=\"move_preset(false)\"><i class=\"fa fa-arrow-down\"></i></a>\n                                </div>\n                            </div>\n                            <div class=\"item-select\">\n                                <label for=\"name\" class=\"select-title\">Name</label>\n                                <textarea class=\"form-control\" id=\"name\" rows=\"6\" cols=\"50\"></textarea>\n                            </div>\n                            <div class=\"item-select\">\n                                <label for=\"description\" class=\"select-title\">Description</label>\n                                <textarea class=\"form-control\" id=\"description\" rows=\"6\" cols=\"50\"></textarea>\n                            </div>\n                            <div class=\"item-select\">\n                                <label for=\"settings\" class=\"select-title\">Settings String</label>\n                                <textarea class=\"form-control\" id=\"settings\" rows=\"6\" cols=\"50\"></textarea>\n                            </div>\n                        </div>\n                        <div class=\"flex-container\" style=\"justify-content: center;\">\n                            <a class=\"btn btn-danger btn-xl rounded-pill mt-5\" onClick=\"delete_preset()\">Delete</a>\n                            <a class=\"btn btn-success btn-xl rounded-pill mt-5\" onClick=\"save_preset()\">Save</a>\n                        </div>\n                        <script>\n                            // Use Flask-rendered local_presets\n                            var local_presets = ";
output += runtime.suppressValue(env.getFilter("tojson").call(context, runtime.contextOrFrameLookup(context, frame, "local_presets")), env.opts.autoescape);
output += ";\n\n                            var branchSelect = document.getElementById(\"branch\");\n                            var presetsSelect = document.getElementById(\"presets\");\n                            var raiseButton = document.getElementById(\"raise_button\");\n                            var lowerButton = document.getElementById(\"lower_button\");\n\n                            branchSelect.addEventListener(\"change\", function () {\n                                presetsSelect.innerHTML = '<option value=\"\" disabled selected>Select a preset</option>';\n                                presetsSelect.disabled = false;\n\n                                var selectedBranch = branchSelect.value;\n                                local_presets[selectedBranch].forEach((preset) => {\n                                    var option = document.createElement(\"option\");\n                                    option.text = preset.name;\n                                    option.value = preset.name;\n                                    presetsSelect.add(option);\n                                });\n\n                                document.getElementById(\"name\").value = \"\";\n                                document.getElementById(\"description\").value = \"\";\n                                document.getElementById(\"settings\").value = \"\";\n                            });\n\n                            presetsSelect.addEventListener(\"change\", function () {\n                                var selectedBranch = branchSelect.value;\n                                var selectedPreset = local_presets[selectedBranch].find(\n                                    (preset) => preset.name == presetsSelect.value\n                                );\n\n                                raiseButton.disabled = false;\n                                lowerButton.disabled = false;\n\n                                document.getElementById(\"name\").value = selectedPreset.name;\n                                document.getElementById(\"description\").value = selectedPreset.description;\n                                document.getElementById(\"settings\").value = selectedPreset.settings_string;\n                            });\n\n                            function save_preset() {\n                                var branch = branchSelect.value;\n                                var name = document.getElementById(\"name\").value;\n                                var description = document.getElementById(\"description\").value;\n                                var settings = document.getElementById(\"settings\").value;\n\n                                if (!branch) {\n                                    alert(\"Please select a branch\");\n                                    return;\n                                }\n\n                                var data = {\n                                    branch: branch,\n                                    name: name,\n                                    description: description,\n                                    settings_string: settings,\n                                };\n\n                                $.ajax({\n                                    url: \"/api/admin/presets\",\n                                    type: \"PUT\",\n                                    data: JSON.stringify(data),\n                                    contentType: \"application/json\",\n                                    success: function () {\n                                        alert(\"Preset saved successfully\");\n                                        location.reload();\n                                    },\n                                    error: function () {\n                                        alert(\"Error saving preset\");\n                                    },\n                                });\n                            }\n\n                            function delete_preset() {\n                                var branch = branchSelect.value;\n                                var name = document.getElementById(\"name\").value;\n\n                                if (!branch) {\n                                    alert(\"Please select a branch\");\n                                    return;\n                                }\n\n                                var data = {\n                                    branch: branch,\n                                    name: name,\n                                };\n\n                                $.ajax({\n                                    url: \"/api/admin/presets\",\n                                    type: \"DELETE\",\n                                    data: JSON.stringify(data),\n                                    contentType: \"application/json\",\n                                    success: function () {\n                                        alert(\"Preset deleted successfully\");\n                                        location.reload();\n                                    },\n                                    error: function () {\n                                        alert(\"Error deleting preset\");\n                                    },\n                                });\n                            }\n\n                            function move_preset(moving_up) {\n                                var branch = branchSelect.value;\n                                var name = document.getElementById(\"name\").value;\n\n                                if (!branch) {\n                                    alert(\"Please select a branch\");\n                                    return;\n                                }\n\n                                var data = {\n                                    branch: branch,\n                                    name: name,\n                                    moving_up: moving_up,\n                                };\n\n                                $.ajax({\n                                    url: \"/api/admin/presets/move\",\n                                    type: \"PUT\",\n                                    data: JSON.stringify(data),\n                                    contentType: \"application/json\",\n                                    success: function () {\n                                        alert(\"Preset moved successfully\");\n                                        location.reload();\n                                    },\n                                    error: function () {\n                                        alert(\"Error moving preset\");\n                                    },\n                                });\n                            }\n                        </script>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </header>\n</body>\n\n</html>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["base.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!--Populate tabs-->\n<div class=\"tab-content\" id=\"nav-tabContent\">\n    <div class=\"tab-pane fade show active\"\n         id=\"nav-started\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-started-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("getting_started.html", false, "base.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
callback(null,t_1);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
callback(null,t_3);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-random\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-random-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("rando_options.html", false, "base.html", false, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
callback(null,t_5);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_8,t_7) {
if(t_8) { cb(t_8); return; }
callback(null,t_7);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-overworld\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-overworld-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("overworld.html", false, "base.html", false, function(t_10,t_9) {
if(t_10) { cb(t_10); return; }
callback(null,t_9);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_12,t_11) {
if(t_12) { cb(t_12); return; }
callback(null,t_11);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-progression\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-progression-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("progression.html", false, "base.html", false, function(t_14,t_13) {
if(t_14) { cb(t_14); return; }
callback(null,t_13);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_16,t_15) {
if(t_16) { cb(t_16); return; }
callback(null,t_15);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-qol\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-qol-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("qualityoflife.html", false, "base.html", false, function(t_18,t_17) {
if(t_18) { cb(t_18); return; }
callback(null,t_17);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_20,t_19) {
if(t_20) { cb(t_20); return; }
callback(null,t_19);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-cosmetics\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-cosmetics-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("cosmetics.html", false, "base.html", false, function(t_22,t_21) {
if(t_22) { cb(t_22); return; }
callback(null,t_21);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_24,t_23) {
if(t_24) { cb(t_24); return; }
callback(null,t_23);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-music\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-music-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("music.html", false, "base.html", false, function(t_26,t_25) {
if(t_26) { cb(t_26); return; }
callback(null,t_25);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_28,t_27) {
if(t_28) { cb(t_28); return; }
callback(null,t_27);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-plando\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-plando-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer.html", false, "base.html", false, function(t_30,t_29) {
if(t_30) { cb(t_30); return; }
callback(null,t_29);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_32,t_31) {
if(t_32) { cb(t_32); return; }
callback(null,t_31);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-settings\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-settings-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("settings.html", false, "base.html", false, function(t_34,t_33) {
if(t_34) { cb(t_34); return; }
callback(null,t_33);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_36,t_35) {
if(t_36) { cb(t_36); return; }
callback(null,t_35);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n    </div>\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})})})})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["cosmetics.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("macros.html", false, "cosmetics.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "list_selector")) {
var t_4 = t_1.list_selector;
} else {
cb(new Error("cannot import 'list_selector'")); return;
}
context.setVariable("list_selector", t_4);
if(Object.prototype.hasOwnProperty.call(t_1, "toggle_input")) {
var t_5 = t_1.toggle_input;
} else {
cb(new Error("cannot import 'toggle_input'")); return;
}
context.setVariable("toggle_input", t_5);
output += "\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div id=\"override_div\"\n         class=\"form-check form-switch item-switch center-flex\"\n         hidden>\n        <label data-toggle=\"tooltip\"\n               title=\"Use Cosmetics set on UI instead of from the patch file.\">\n            <input class=\"form-check-input\"\n                   type=\"checkbox\"\n                   name=\"override_cosmetics\"\n                   id=\"override_cosmetics\"\n                   value=\"True\"\n                   display_name=\"Override Default Cosmetics\"\n                   checked/>\n            Override Default Cosmetics\n        </label>\n    </div>\n    <div class=\"row\">\n        <div class=\"col border panel\">\n            <div class=\"row\">\n                <h2 class=\"title\">MISCELLANEOUS</h2>\n                <div class=\"flex-container\">\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">D-Pad Display</p>\n                        <select name=\"dpad_display\"\n                                id=\"dpad_display\"\n                                display_name=\"D-Pad Display\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Randomization type\"\n                                data-toggle=\"tooltip\"\n                                title=\"Displays a D-pad overlay for Tag Anywhere and a Homing Ammo Toggle.\">\n                            <option selected value=\"off\">\n                                Off\n                            </option>\n                            <option value=\"on\">\n                                On\n                            </option>\n                            <option value=\"minimal\">\n                                Minimalistic\n                            </option>\n                        </select>\n                    </div>\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">Random Models</p>\n                        <select name=\"random_models\"\n                                id=\"random_models\"\n                                display_name=\"Random Models\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Random Models\"\n                                data-toggle=\"tooltip\"\n                                title=\"Changes various models in the game\">\n                            <option selected id=\"off\" value=\"off\" title=\"\">\n                                Off\n                            </option>\n                            <option id=\"random\" value=\"random\">\n                                Random\n                            </option>\n                            <option id=\"extreme\" value=\"extreme\">\n                                Extreme\n                            </option>\n                        </select>\n                    </div>\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">Random Enemy Colors</p>\n                        <select name=\"random_enemy_colors\"\n                                id=\"random_enemy_colors\"\n                                display_name=\"Random Enemy Colors\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Random Enemy Colors\"\n                                data-toggle=\"tooltip\"\n                                title=\"Changes the colors of various enemies in the game\">\n                            <option selected id=\"off\" value=\"off\" title=\"\">\n                                Off\n                            </option>\n                            <option id=\"random\" value=\"random\">\n                                Random\n                            </option>\n                            <option id=\"extreme\" value=\"extreme\">\n                                Extreme\n                            </option>\n                        </select>\n                    </div>\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">Head Size</p>\n                        <select name=\"big_head_mode\"\n                                id=\"big_head_mode\"\n                                display_name=\"Head Size\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Head Size\"\n                                data-toggle=\"tooltip\"\n                                title=\"Changes the size of the various character's head to be bigger or smaller than usual\">\n                            <option selected id=\"off\" value=\"off\" title=\"\">\n                                Regular\n                            </option>\n                            <option id=\"big\" value=\"big\">\n                                Big Head Mode\n                            </option>\n                            <option id=\"small\" value=\"small\">\n                                Small Head Mode\n                            </option>\n                            <option id=\"random\" value=\"random\">\n                                Random Head Size\n                            </option>\n                        </select>\n                    </div>\n                    <div class=\"item-color-select\">\n                        <div class=\"color-selector\">\n                            <p class=\"select-title\">Golden Banana Skin Color</p>\n                            <div id=\"gb_custom\">\n                                <div class=\"input-group mb-3 gbColorPicker\" style=\"display:flex\">\n                                    <select name=\"gb_colors\" id=\"gb_colors\" class=\"form-select\" aria-label=\"GB Skin\">\n                                        <option selected value=\"vanilla\">Vanilla</option>\n                                        <option value=\"randomized\">Randomized</option>\n                                        <option value=\"custom\">Custom</option>\n                                    </select>\n                                    <div class=\"color-input-container\">\n                                        <input type=\"color\"\n                                            name=\"gb_custom_color\"\n                                            id=\"gb_custom_color\"\n                                            default=\"#000000\"\n                                            class=\"color-input\">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"flex-container\">\n                    ";
output += runtime.suppressValue((lineno = 128, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["misc_cosmetics","Random Miscellaneous Cosmetics","Randomizes miscellaneous cosmetic elements, including:&#10;- Peril Path Panic/Searchlight Seek Klaptraps&#10;- Skybox colors"])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 129, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["dark_mode_textboxes","Dark Mode UI","Text bubbles will be darkened, with the font brightened. The DPad Graphic will be darkened."])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 130, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["pause_hint_coloring","Color Hints in Pause Menu","Various important segments in hints on the pause menu will be colored to assist with parsing.",runtime.contextOrFrameLookup(context, frame, "True")])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 131, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["disco_chunky","Disco Chunky","Gives Chunky his disco outfit. Will only work if his model is set to regular chunky."])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 132, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["smoother_camera","Smoother Camera","Controlling the camera with the C Buttons behaves closer to how Banjo-Tooie operates."])), env.opts.autoescape);
output += "\n                    <div class=\"spacer\"></div>\n                    <div class=\"form-check form-switch item-switch holiday\" data-toggle=\"tooltip\" hidden\n                        title=\"Happy Holidays from the DK64 Randomizer dev team. Limited time option.\">\n                        <input\n                            class=\"form-check-input\"\n                            type=\"checkbox\"\n                            role=\"switch\"\n                            name=\"holiday_setting_offseason\"\n                            id=\"holiday_setting_offseason\"\n                            display_name=\"Holiday Mode\"\n                            value=\"False\" />\n                        <label class=\"form-check-label\" for=\"holiday_setting_offseason\">Holiday Mode</label>\n                    </div>\n                    <div class=\"spacer holiday hidden\"></div>\n                    ";
output += "\n                </div>\n            </div>\n            <hr />\n            <div class=\"row\">\n                <h2 class=\"title\">ACCESSIBILITY</h2>\n                <div class=\"flex-container\">\n                    ";
output += runtime.suppressValue((lineno = 167, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["remove_water_oscillation","Remove Water Oscillation","Remove water oscillation effects and the seasick ship rocking effect. For those who feel motion sick from these effects."])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 168, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["head_balloons","Kong Head on Balloons","Adds kong faces to balloons, making them easier to distinguish in various lighting conditions.",runtime.contextOrFrameLookup(context, frame, "True")])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 169, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["troff_brighten","Brighten Boss Door Opening",runtime.memberLookup(("Brightens the door-opening sequence in Troff 'n' Scoff to make the reward easier to see."),"True")])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 170, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["better_dirt_patch_cosmetic","Higher contrast dirt patches",runtime.memberLookup(("Dirt Patches have the letters 'D' and 'K' colored yellow and red to make them more visible."),"True")])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 171, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["crosshair_outline","Outlined Crosshair","The crosshair used in various situations, like shooting your gun, will have a black outline."])), env.opts.autoescape);
output += "\n                    <div class=\"spacer\"></div>\n                </div>\n                <div class=\"flex-container\">\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">\n                            Colorblind Mode\n                        </p>\n                        <select name=\"colorblind_mode\"\n                                id=\"colorblind_mode\"\n                                display_name=\"Colorblind Mode\"\n                                class=\"form-select\"\n                                aria-label=\"Colorblind Mode\">\n                            <option selected value=\"off\">\n                                Off\n                            </option>\n                            <option value=\"prot\">\n                                Red-Green (Protan)\n                            </option>\n                            <option value=\"deut\">\n                                Red-Green (Deutan)\n                            </option>\n                            <option value=\"trit\">\n                                Blue-Yellow (Tritan)\n                            </option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col border panel\">\n            <h2 class=\"title\">COLORS\n                <label data-toggle=\"tooltip\"\n                        title=\"Randomizes all Kong and Transformation Colors.\">\n                    <input class=\"dice_checkbox\"\n                            type=\"checkbox\"\n                            name=\"random_colors\"\n                            id=\"random_colors\"\n                            value=\"True\"/>\n                    <label for=\"random_colors\"></label>\n                </label>\n            </h2>\n            <div class=\"flex-container\">\n                ";
frame = frame.push();
var t_8 = runtime.contextOrFrameLookup(context, frame, "kong_zones");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_6;
if(runtime.isArray(t_8)) {
var t_7 = t_8.length;
for(t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6][0];
frame.set("[object Object]", t_8[t_6][0]);
var t_10 = t_8[t_6][1];
frame.set("[object Object]", t_8[t_6][1]);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n                    <div class=\"flex-container\" style=\"flex-direction:column\">\n                        <div class=\"item-color-select\">\n                            <div class=\"color-selector\">\n                                <p class=\"select-title\">";
output += runtime.suppressValue(t_9, env.opts.autoescape);
output += "</p>\n                                ";
frame = frame.push();
var t_13 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "kong_zones")),t_9);
if(t_13) {t_13 = runtime.fromIterator(t_13);
var t_12 = t_13.length;
for(var t_11=0; t_11 < t_13.length; t_11++) {
var t_14 = t_13[t_11];
frame.set("zone", t_14);
frame.set("loop.index", t_11 + 1);
frame.set("loop.index0", t_11);
frame.set("loop.revindex", t_12 - t_11);
frame.set("loop.revindex0", t_12 - t_11 - 1);
frame.set("loop.first", t_11 === 0);
frame.set("loop.last", t_11 === t_12 - 1);
frame.set("loop.length", t_12);
output += "\n                                    <div id=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_9), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_14), env.opts.autoescape);
output += "_custom\">\n                                        <div class=\"input-group mb-3 ";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_9), env.opts.autoescape);
output += runtime.suppressValue(env.getFilter("lower").call(context, t_14), env.opts.autoescape);
output += "ColorPicker\" style=\"display:flex\">\n                                            <select name=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_9), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_14), env.opts.autoescape);
output += "_colors\" id=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_9), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_14), env.opts.autoescape);
output += "_colors\" class=\"form-select\" aria-label=\"";
output += runtime.suppressValue(t_9, env.opts.autoescape);
output += " ";
output += runtime.suppressValue(t_14, env.opts.autoescape);
output += "\">\n                                                <option selected value=\"vanilla\">";
output += runtime.suppressValue(t_14, env.opts.autoescape);
output += ": Vanilla</option>\n                                                <option value=\"randomized\">";
output += runtime.suppressValue(t_14, env.opts.autoescape);
output += ": Randomized</option>\n                                                <option value=\"custom\">";
output += runtime.suppressValue(t_14, env.opts.autoescape);
output += ": Custom</option>\n                                            </select>\n                                            <div class=\"color-input-container\">\n                                                <input type=\"color\"\n                                                    name=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_9), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_14), env.opts.autoescape);
output += "_custom_color\"\n                                                    id=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_9), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_14), env.opts.autoescape);
output += "_custom_color\"\n                                                    default=\"#000000\"\n                                                    class=\"color-input\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                ";
;
}
}
frame = frame.pop();
output += "\n                            </div>\n                        </div>\n                    </div>\n                ";
;
}
} else {
t_6 = -1;
var t_7 = runtime.keys(t_8).length;
for(var t_15 in t_8) {
t_6++;
var t_16 = t_8[t_15];
frame.set("kong", t_15);
frame.set("object_data", t_16);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n                    <div class=\"flex-container\" style=\"flex-direction:column\">\n                        <div class=\"item-color-select\">\n                            <div class=\"color-selector\">\n                                <p class=\"select-title\">";
output += runtime.suppressValue(t_15, env.opts.autoescape);
output += "</p>\n                                ";
frame = frame.push();
var t_19 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "kong_zones")),t_15);
if(t_19) {t_19 = runtime.fromIterator(t_19);
var t_18 = t_19.length;
for(var t_17=0; t_17 < t_19.length; t_17++) {
var t_20 = t_19[t_17];
frame.set("zone", t_20);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
output += "\n                                    <div id=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_15), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_20), env.opts.autoescape);
output += "_custom\">\n                                        <div class=\"input-group mb-3 ";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_15), env.opts.autoescape);
output += runtime.suppressValue(env.getFilter("lower").call(context, t_20), env.opts.autoescape);
output += "ColorPicker\" style=\"display:flex\">\n                                            <select name=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_15), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_20), env.opts.autoescape);
output += "_colors\" id=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_15), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_20), env.opts.autoescape);
output += "_colors\" class=\"form-select\" aria-label=\"";
output += runtime.suppressValue(t_15, env.opts.autoescape);
output += " ";
output += runtime.suppressValue(t_20, env.opts.autoescape);
output += "\">\n                                                <option selected value=\"vanilla\">";
output += runtime.suppressValue(t_20, env.opts.autoescape);
output += ": Vanilla</option>\n                                                <option value=\"randomized\">";
output += runtime.suppressValue(t_20, env.opts.autoescape);
output += ": Randomized</option>\n                                                <option value=\"custom\">";
output += runtime.suppressValue(t_20, env.opts.autoescape);
output += ": Custom</option>\n                                            </select>\n                                            <div class=\"color-input-container\">\n                                                <input type=\"color\"\n                                                    name=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_15), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_20), env.opts.autoescape);
output += "_custom_color\"\n                                                    id=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_15), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_20), env.opts.autoescape);
output += "_custom_color\"\n                                                    default=\"#000000\"\n                                                    class=\"color-input\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                ";
;
}
}
frame = frame.pop();
output += "\n                            </div>\n                        </div>\n                    </div>\n                ";
;
}
}
}
frame = frame.pop();
output += "\n            </div>\n            <hr />\n            <div class=\"row\">\n                <h2 class=\"title\">DEFAULT GAME SETTINGS</h2>\n                <div class=\"flex-container\">\n                    ";
output += runtime.suppressValue((lineno = 246, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["camera_is_not_inverted","Disable Y-Inverted First Person Camera","If enabled, the camera will look up when the player holds up on the stick, the opposite of how the vanilla game behaves."])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 247, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["camera_is_follow","Follow Cam","Camera will always follow behind the player."])), env.opts.autoescape);
output += "\n                </div>\n                ";
output += "\n                <div class=\"flex-container\">\n                    <div class=\"item-group\">\n                        <p class=\"select-title\">Music Volume (%)</p>\n                        <input class=\"form-control\"\n                            min=\"0\"\n                            max=\"100\"\n                            name=\"music_volume\"\n                            id=\"music_volume\"\n                            display_name=\"Music Volume\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"Music Volume\"\n                            default=\"100\"\n                            placeholder=\"100\"/>\n                    </div>\n                    <div class=\"item-group\">\n                        <p class=\"select-title\">SFX Volume (%)</p>\n                        <input class=\"form-control\"\n                            min=\"0\"\n                            max=\"100\"\n                            name=\"sfx_volume\"\n                            id=\"sfx_volume\"\n                            display_name=\"SFX Volume\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"SFX Volume\"\n                            default=\"100\"\n                            placeholder=\"100\"/>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<script>\n    KONG_ZONES = {\n        \"DK\": [\"Fur\", \"Tie\"], \n        \"Diddy\": [\"Clothes\"], \n        \"Lanky\": [\"Clothes\", \"Fur\"], \n        \"Tiny\": [\"Clothes\", \"Hair\"], \n        \"Chunky\": [\"Main\", \"Other\"], \n        \"Rambi\": [\"Skin\"], \n        \"Enguarde\": [\"Skin\"]\n    }\n    \n    $('.nav-tabs').click(function() {\n        var settings = (document.cookie).split('saved_settings=')\n        if (typeof settings[1] !== 'undefined') {\n            var object = JSON.parse(settings[1])\n            Object.keys(KONG_ZONES).forEach(kong => {\n                KONG_ZONES[kong].forEach(zone => {\n                    const attribute = `${kong.toLowerCase()}_${zone.toLowerCase()}_custom_color`;\n                    const cls = `.${kong.toLowerCase()}${zone.toLowerCase()}ColorPicker`;\n                    if (object.hasOwnProperty(attribute)) {\n                        $(cls).attr('style', 'background-color:' + object[attribute] + ';')\n                    }\n                })\n            })\n            if (object.hasOwnProperty(\"gb_custom_color\")) {\n                $(\".gbColorPicker\").attr(\"style\", \"background-color\" + object[\"gb_custom_color\"] + \";\")\n            }\n        }\n    })\n    $(function() {\n        var pattern = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];\n        var current = 0;\n\n        var keyHandler = function (event) {\n            // If the key isn't in the pattern, or isn't the current key in the pattern, reset\n            if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {\n                current = 0;\n                return;\n            }\n            // Update how much of the pattern is complete\n            current++;\n            // If complete, remove hidden and reset\n            if (pattern.length === current) {\n                current = 0;\n                $('.holiday').removeAttr('hidden');\n            }\n        };\n        // Listen for keydown events\n        document.addEventListener('keydown', keyHandler, false);\n    })\n</script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["detailed_logic.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("macros.html", false, "detailed_logic.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "list_selector")) {
var t_4 = t_1.list_selector;
} else {
cb(new Error("cannot import 'list_selector'")); return;
}
context.setVariable("list_selector", t_4);
output += "\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div class=\"row\">\n        <div class=\"col border panel\">\n            <h2 class=\"title\">MINIGAME POOL</h2>\n            ";
output += runtime.suppressValue((lineno = 5, colno = 28, runtime.callWrap(t_4, "list_selector", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data_module")),"minigames"),runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data_module")),"listType")),"minigame"),"MINIGAME SELECTOR"])), env.opts.autoescape);
output += "\n        </div>\n        <div class=\"col border panel\">\n            <h2 class=\"title\">ENEMY POOL</h2>\n            <div class=\"flex-container\"></div>\n        </div>\n    </div>\n</div>\n<script>\n    $(function() {\n        $('[data-toggle=\"tooltip\"]').tooltip({\n            trigger: 'hover'\n        })\n    })\n</script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["getting_started.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"container\">\n    <div class=\"row pt-4\">\n        <div style=\"background:#b01d00; padding:8px;\" id=\"spoiler_warning_4\">\n            <h2 class=\"title\" >DEV BRANCH</h2>\n            <p style=\"padding-bottom: 16px;max-width:700px;margin-left:auto;margin-right:auto\">\n                This is the dev branch, and as such, there are a lot of frequent changes to options, functionality and support\n                for settings strings. Be sure to watch <em>#dev-branch-changes</em> on the\n                <a class=\"no-decoration\" href=\"https://discord.dk64randomizer.com\">Discord</a> to be up to date on the latest changes.\n            </p>\n            <p style=\"padding-bottom: 16px;max-width:700px;margin-left:auto;margin-right:auto\">\n                If this is your first time playing DK64 Randomizer, we'd recommend using the stable site (<a href=\"https://dk64randomizer.com\">dk64randomizer.com</a>) first.\n            </p>\n        </div>\n    </div>\n</div>\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div class=\"row\">\n        <div class=\"col border pb-3\">\n            <h2 class=\"title\">Presets</h2>\n            <div>Presets are settings that can selected and loaded from.</div>\n            <div>Applying a preset will overwrite all settings that have been selected.</div>\n            <div class=\"flex-container\" style=\"justify-content: center;\">\n                <div class=\"item-select\">\n                    <label for=\"presets\" class=\"select-title\">Presets</label>\n                    <select class=\"form-select\" id=\"presets\"></select>\n                </div>\n                <input id=\"apply_preset\" class=\"btn btn-secondary\" type=\"button\" value=\"Apply\"/>\n            </div>\n            <p class=\"select-title\" id=\"output\" style=\"text-align:left;\"></p>\n            \n            \n            ";
output += "\n        </div>\n        <div class=\"col border pb-3\">\n            <h2 class=\"title\">Random Settings</h2>\n            <div>This option will randomize all non-cosmetic settings.</div>\n            <div class=\"flex-container\" style=\"justify-content: center;\">\n                <div class=\"item-select\">\n                    <label for=\"random-weights\" class=\"select-title\">Random Setting Presets</label>\n                    <select class=\"form-select\" id=\"random-weights\"></select>\n                </div>\n                <input id=\"randomize_settings\"\n                       name=\"randomize_settings\"\n                       class=\"btn btn-secondary\"\n                       type=\"button\"\n                       value=\"Randomize Settings\"/>\n            </div>\n        </div>\n        ";
output += "\n        ";
output += "\n    </div>\n    <div class=\"row\">\n        <div class=\"col border pb-3\">\n            <div id=\"plandomizer_container\">\n                <h2 class=\"title\">PLANDOMIZER</h2>\n                <div class=\"pb-3\">\n                    This mode allows users to specify rewards, hints, and other settings. This is an advanced mode and is not recommended for beginners.\n                </div>\n                <div class=\"form-check form-switch\">\n                    <label>\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"enable_plandomizer\"\n                                id=\"enable_plandomizer\"\n                                display_name=\"Enable Plandomizer\"\n                                value=\"True\"/>\n                        Enable Plandomizer\n                    </label>\n                </div>\n            </div>\n        </div>\n        <div class=\"col border pb-3\"></div>\n    </div>\n</div>\n<script>\n    $(function() {\n        $('[data-toggle=\"tooltip\"]').tooltip({\n            trigger: 'hover'\n        })\n    })\n    \n    $('#presets').on('change', function() {\n        var selected = $(\"#presets option:selected\").text();\n        var selected_desc = $(\"#presets option:selected\").attr(\"title\");\n        if (selected == \"Season 3 Race Settings\") $(\"#output\").html(\"- Season 3 Race Settings: Level Order Randomizer of medium length that starts you with keys 1, 3 and item randomizer. These settings are designed to give a well-rounded experience, accessible for veterans and newcomers alike. Optimized for races.\")\n        else if (selected == \"Hell Mode\") $(\"#output\").html(\"- Hell Mode: Absolute Hell. Decoupled Loading Zone Randomizer with all randomization options on. GB and Color Banana requirements are near maxed. Hints are Cryptic and you start with 1 Kong and need all 8 keys. Moves are in randomized locations with High prices. Also bonus barrels are really neat. Have Fun.\")\n        else if (selected == \"Vanilla Game But Better\") $(\"#output\").html(\"- Vanilla Game But Better: No randomization, only the quality of life settings enabled.\")\n        else if (selected == \"Hitlist\") $(\"#output\").html(\"- Hitlist: Complete the 8 of the worst checks in the game. You will <strong>NEED</strong> this <a href='https://github.com/Brian0255/Track-O-Matic/releases/latest' style='text-decoration:underline'>tracker</a> and read the specialized <a href='https://docs.google.com/document/d/1V2jj3bT18fTIuEbuqYDDC8pePBFSpVd_U__p2AvcNlc/edit' style='text-decoration:underline'>ruleset</a>.\")\n        else $(\"#output\").html(`- ${selected}: ${selected_desc}`)\n    })\n</script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["lightswitch.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"position-relative\">\n    <div class=\"position-absolute bottom-0 end-0\">\n        <button class=\"nav-link bg-transparent nav-item\"\n                id=\"light-switch\"\n                type=\"button\"\n                aria-selected=\"false\">\n            <p class=\"select-title d-flex text-end\" style=\"min-width:0px\">\n                <span id=\"light-switch-icon-light\" hidden>\n                    <i class=\"fa-solid fa-lightbulb fa-xl\"></i>\n                </span>\n                <span id=\"light-switch-icon-dark\">\n                    <i class=\"fa-solid fa-moon fa-xl\"></i>\n                </span>\n            </p>\n        </button>\n    </div>\n</div>\n<script>\n    document.getElementById('light-switch').addEventListener('click',()=>{\n        const dark_hook = document.getElementById(\"light-switch-icon-dark\");\n        const light_hook = document.getElementById(\"light-switch-icon-light\");\n        if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {\n            document.documentElement.setAttribute('data-bs-theme','light')\n            light_hook.removeAttribute(\"hidden\")\n            dark_hook.setAttribute(\"hidden\", \"\")\n        }\n        else {\n            document.documentElement.setAttribute('data-bs-theme','dark')\n            dark_hook.removeAttribute(\"hidden\")\n            light_hook.setAttribute(\"hidden\", \"\")\n        }\n    })\n</script>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["macros.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var macro_t_1 = runtime.makeMacro(
["list", "name", "title", "tooltip", "size"], 
["includeDisclaimer", "overrideDisclaimer"], 
function (l_list, l_name, l_title, l_tooltip, l_size, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("list", l_list);
frame.set("name", l_name);
frame.set("title", l_title);
frame.set("tooltip", l_tooltip);
frame.set("size", l_size);
frame.set("includeDisclaimer", Object.prototype.hasOwnProperty.call(kwargs, "includeDisclaimer") ? kwargs["includeDisclaimer"] : 0);frame.set("overrideDisclaimer", Object.prototype.hasOwnProperty.call(kwargs, "overrideDisclaimer") ? kwargs["overrideDisclaimer"] : "");var t_2 = "";t_2 += "\n    <!-- Icon triggers modal -->\n    <input class=\"customize\"\n           type=\"button\"\n           href=\"#\"\n           id=\"";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_modal\"\n           data-bs-toggle=\"modal\"\n           data-bs-target=\"#";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_Modal\"\n           data-toggle=\"tooltip\"\n           title=\"";
t_2 += runtime.suppressValue(l_tooltip, env.opts.autoescape);
t_2 += "\"/>\n</div>\n<!-- Modal -->\n<div class=\"modal fade\"\n     id=\"";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_Modal\"\n     tabindex=\"-1\"\n     aria-labelledby=\"";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_ModalLabel\"\n     aria-hidden=\"true\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h3 class=\"modal-title title\" id=\"";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_ModalLabel\">";
t_2 += runtime.suppressValue(l_title, env.opts.autoescape);
t_2 += "</h3>\n                <button type=\"button\"\n                        class=\"btn-close\"\n                        data-bs-dismiss=\"modal\"\n                        aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"item-multiselect\" style=\"margin-left: 105px;\">\n                    <div class=\"color-selector\">\n                        <div class=\"input-group\">\n                            <div class=\"input-group-prepend\">\n                                <div class=\"input-group-text search\">\n                                    <input type=\"text\"\n                                           class=\"form-control\"\n                                           id=\"";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_search_box\"\n                                           name=\"search\"\n                                           placeholder=\"Search\"/>\n                                </div>\n                            </div>\n                            <select name=\"";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_selected\"\n                                    id=\"";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_selected\"\n                                    class=\"form-select multi-select selected\"\n                                    aria-label=\"List_Selector\"\n                                    multiple\n                                    size=\"";
t_2 += runtime.suppressValue(l_size, env.opts.autoescape);
t_2 += "\">\n                                ";
frame = frame.push();
var t_5 = l_list;
if(t_5) {t_5 = runtime.fromIterator(t_5);
var t_4 = t_5.length;
for(var t_3=0; t_3 < t_5.length; t_3++) {
var t_6 = t_5[t_3];
frame.set("item", t_6);
frame.set("loop.index", t_3 + 1);
frame.set("loop.index0", t_3);
frame.set("loop.revindex", t_4 - t_3);
frame.set("loop.revindex0", t_4 - t_3 - 1);
frame.set("loop.first", t_3 === 0);
frame.set("loop.last", t_3 === t_4 - 1);
frame.set("loop.length", t_4);
t_2 += "\n                                    <option value=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_6),"value"), env.opts.autoescape);
t_2 += "\" title=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_6),"tooltip"), env.opts.autoescape);
t_2 += "\">\n                                        ";
t_2 += runtime.suppressValue(runtime.memberLookup((t_6),"name"), env.opts.autoescape);
t_2 += "\n                                    </option>\n                                ";
;
}
}
frame = frame.pop();
t_2 += "\n                            </select>\n                        </div>\n                    </div>\n                </div>\n                ";
if(runtime.contextOrFrameLookup(context, frame, "overrideDisclaimer") != "") {
t_2 += "\n                    <div class=\"fst-italic\">\n                        <div>";
t_2 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "overrideDisclaimer"), env.opts.autoescape);
t_2 += "</div>\n                    </div>\n                ";
;
}
t_2 += "\n                ";
if(runtime.contextOrFrameLookup(context, frame, "includeDisclaimer")) {
t_2 += "\n                    <div class=\"fst-italic\">\n                        <div>If nothing is selected, all options are treated as selected.</div>\n                        <div>Disable the setting slider to disable all options.</div>\n                    </div>\n                ";
;
}
t_2 += "\n                ";
if(l_name == "minigames_list") {
t_2 += "\n                    <div class=\"form-check form-switch\" style=\"padding-left: 1.5em;\">\n                        <label data-toggle=\"tooltip\"\n                            style=\"font-size:14px;\"\n                            title=\"The hardest variants of minigames are removed.\">\n                            <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"disable_hard_minigames\"\n                                id=\"disable_hard_minigames\"\n                                value=\"True\"/>\n                            No Hard Minigames\n                        </label>\n                    </div>\n                ";
;
}
t_2 += "\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_select_all\">Select All</button>\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_reset\">Reset</button>\n                <button type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>\n<script>\n    $('#";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_selected option').mousedown(function(e) {\n        var el = e.target\n    \n        $(this).prop('selected', !$(this).prop('selected'));\n        $(this).trigger('change');\n    \n        // fixes erratic scroll behavior in Chrome\n        var scrollTop = el.parentNode.scrollTop;\n        setTimeout(() => el.parentNode.scrollTo(0, scrollTop), 0);\n    \n        return false;\n    });\n    \n    $('#";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_select_all').click(function() {\n        $('#";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_selected option').prop('selected', true);\n        $('#";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_selected').trigger('change');\n    });\n    \n    $('#";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_reset').click(function() {\n        $('#";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_selected option:selected').prop('selected', false);\n        $('#";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_selected').trigger('change');\n    });\n    \n    $('#";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_search_box').keyup(function() {\n        var keyword = document.getElementById(\"";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_search_box\").value;\n        var select = document.getElementById(\"";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_selected\");\n        for (var i = 0; i < select.length; i++) {\n            var txt = select.options[i].text;\n            if (txt.substring(0, keyword.length).toLowerCase() !== keyword.toLowerCase() && keyword.trim() !== \"\") {\n                select.options[i].style.display = 'none';\n            } else {\n                select.options[i].style.display = 'list-item';\n            }\n        }\n    });\n</script>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("list_selector");
context.setVariable("list_selector", macro_t_1);
output += "\n";
var macro_t_7 = runtime.makeMacro(
["list", "name", "title", "tooltip"], 
[], 
function (l_list, l_name, l_title, l_tooltip, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("list", l_list);
frame.set("name", l_name);
frame.set("title", l_title);
frame.set("tooltip", l_tooltip);
var t_8 = "";t_8 += "\n    <!-- Icon triggers modal -->\n    <input class=\"customize\"\n           type=\"button\"\n           href=\"#\"\n           id=\"";
t_8 += runtime.suppressValue(l_name, env.opts.autoescape);
t_8 += "_modal\"\n           data-bs-toggle=\"modal\"\n           data-bs-target=\"#";
t_8 += runtime.suppressValue(l_name, env.opts.autoescape);
t_8 += "_Modal\"\n           data-toggle=\"tooltip\"\n           title=\"";
t_8 += runtime.suppressValue(l_tooltip, env.opts.autoescape);
t_8 += "\"/>\n</div>\n<!-- Modal -->\n<div class=\"modal fade\"\n     id=\"";
t_8 += runtime.suppressValue(l_name, env.opts.autoescape);
t_8 += "_Modal\"\n     tabindex=\"-1\"\n     aria-labelledby=\"";
t_8 += runtime.suppressValue(l_name, env.opts.autoescape);
t_8 += "_ModalLabel\"\n     aria-hidden=\"true\">\n    <div class=\"modal-dialog\" style=\"max-width:700px\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h3 class=\"modal-title title\" id=\"";
t_8 += runtime.suppressValue(l_name, env.opts.autoescape);
t_8 += "_ModalLabel\">";
t_8 += runtime.suppressValue(l_title, env.opts.autoescape);
t_8 += "</h3>\n                <button type=\"button\"\n                        class=\"btn-close\"\n                        data-bs-dismiss=\"modal\"\n                        aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <div>\n                    <div class=\"flex-container\">\n                        ";
frame = frame.push();
var t_11 = l_list;
if(t_11) {t_11 = runtime.fromIterator(t_11);
var t_10 = t_11.length;
for(var t_9=0; t_9 < t_11.length; t_9++) {
var t_12 = t_11[t_9];
frame.set("item", t_12);
frame.set("loop.index", t_9 + 1);
frame.set("loop.index0", t_9);
frame.set("loop.revindex", t_10 - t_9);
frame.set("loop.revindex0", t_10 - t_9 - 1);
frame.set("loop.first", t_9 === 0);
frame.set("loop.last", t_9 === t_10 - 1);
frame.set("loop.length", t_10);
t_8 += "\n                            <div class=\"item-select\" style=\"margin:0;flex:0;min-width:150px;\">\n                                <p class=\"select-title\">";
t_8 += runtime.suppressValue(runtime.memberLookup((t_12),"name"), env.opts.autoescape);
t_8 += "</p>\n                                ";
if(runtime.memberLookup((t_12),"name") == "Starting Time") {
t_8 += "\n                                    <input \n                                    min=\"0\"\n                                    max=\"65535\"\n                                    name=\"";
t_8 += runtime.suppressValue(l_name, env.opts.autoescape);
t_8 += "_";
t_8 += runtime.suppressValue(runtime.memberLookup((t_12),"value"), env.opts.autoescape);
t_8 += "\"\n                                    id=\"";
t_8 += runtime.suppressValue(l_name, env.opts.autoescape);
t_8 += "_";
t_8 += runtime.suppressValue(runtime.memberLookup((t_12),"value"), env.opts.autoescape);
t_8 += "\"\n                                    style=\"width:15%\"\n                                    class=\"form-control center-div\"\n                                    type=\"number\"\n                                    value=\"";
t_8 += runtime.suppressValue(runtime.memberLookup((t_12),"default"), env.opts.autoescape);
t_8 += "\"\n                                    default_val=\"";
t_8 += runtime.suppressValue(runtime.memberLookup((t_12),"default"), env.opts.autoescape);
t_8 += "\">\n                                ";
;
}
else {
t_8 += "\n                                    <input \n                                    min=\"-32768\"\n                                    max=\"32767\"\n                                    name=\"";
t_8 += runtime.suppressValue(l_name, env.opts.autoescape);
t_8 += "_";
t_8 += runtime.suppressValue(runtime.memberLookup((t_12),"value"), env.opts.autoescape);
t_8 += "\"\n                                    id=\"";
t_8 += runtime.suppressValue(l_name, env.opts.autoescape);
t_8 += "_";
t_8 += runtime.suppressValue(runtime.memberLookup((t_12),"value"), env.opts.autoescape);
t_8 += "\"\n                                    style=\"width:15%\"\n                                    class=\"form-control center-div\"\n                                    type=\"number\"\n                                    value=\"";
t_8 += runtime.suppressValue(runtime.memberLookup((t_12),"default"), env.opts.autoescape);
t_8 += "\"\n                                    default_val=\"";
t_8 += runtime.suppressValue(runtime.memberLookup((t_12),"default"), env.opts.autoescape);
t_8 += "\">\n                                ";
;
}
t_8 += "\n                            </div>\n                        ";
;
}
}
frame = frame.pop();
t_8 += "\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"";
t_8 += runtime.suppressValue(l_name, env.opts.autoescape);
t_8 += "_reset\">Reset</button>\n                <button type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>\n<script>\n    $('#";
t_8 += runtime.suppressValue(l_name, env.opts.autoescape);
t_8 += "_reset').click(function() {\n        ";
frame = frame.push();
var t_15 = l_list;
if(t_15) {t_15 = runtime.fromIterator(t_15);
var t_14 = t_15.length;
for(var t_13=0; t_13 < t_15.length; t_13++) {
var t_16 = t_15[t_13];
frame.set("item", t_16);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
t_8 += "\n            $('#";
t_8 += runtime.suppressValue(l_name, env.opts.autoescape);
t_8 += "_";
t_8 += runtime.suppressValue(runtime.memberLookup((t_16),"value"), env.opts.autoescape);
t_8 += "').prop('value', $('#";
t_8 += runtime.suppressValue(l_name, env.opts.autoescape);
t_8 += "_";
t_8 += runtime.suppressValue(runtime.memberLookup((t_16),"value"), env.opts.autoescape);
t_8 += "').attr('default_val'))\n            $('#";
t_8 += runtime.suppressValue(l_name, env.opts.autoescape);
t_8 += "_";
t_8 += runtime.suppressValue(runtime.memberLookup((t_16),"value"), env.opts.autoescape);
t_8 += "').trigger('change')\n        ";
;
}
}
frame = frame.pop();
t_8 += "\n    })\n</script>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_8);
});
context.addExport("properties_selector");
context.setVariable("properties_selector", macro_t_7);
output += "\n";
var macro_t_17 = runtime.makeMacro(
["id", "name"], 
["tooltip", "default_checked", "altered_name"], 
function (l_id, l_name, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("id", l_id);
frame.set("name", l_name);
frame.set("tooltip", Object.prototype.hasOwnProperty.call(kwargs, "tooltip") ? kwargs["tooltip"] : "");frame.set("default_checked", Object.prototype.hasOwnProperty.call(kwargs, "default_checked") ? kwargs["default_checked"] : runtime.contextOrFrameLookup(context, frame, "False"));frame.set("altered_name", Object.prototype.hasOwnProperty.call(kwargs, "altered_name") ? kwargs["altered_name"] : "");var t_18 = "";t_18 += "\n<div class=\"form-check form-switch item-switch\" data-toggle=\"tooltip\"\n            title=\"";
t_18 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tooltip"), env.opts.autoescape);
t_18 += "\">\n    ";
if(runtime.contextOrFrameLookup(context, frame, "default_checked")) {
t_18 += "\n        <input\n            class=\"form-check-input\"\n            type=\"checkbox\"\n            role=\"switch\"\n            name=\"";
t_18 += runtime.suppressValue(l_id, env.opts.autoescape);
t_18 += "\"\n            id=\"";
t_18 += runtime.suppressValue(l_id, env.opts.autoescape);
t_18 += "\"\n            display_name=\"";
t_18 += runtime.suppressValue(l_name, env.opts.autoescape);
t_18 += "\"\n            value=\"True\" checked />\n    ";
;
}
else {
t_18 += "\n        <input\n            class=\"form-check-input\"\n            type=\"checkbox\"\n            role=\"switch\"\n            name=\"";
t_18 += runtime.suppressValue(l_id, env.opts.autoescape);
t_18 += "\"\n            id=\"";
t_18 += runtime.suppressValue(l_id, env.opts.autoescape);
t_18 += "\"\n            display_name=\"";
t_18 += runtime.suppressValue(l_name, env.opts.autoescape);
t_18 += "\"\n            value=\"True\" />\n    ";
;
}
t_18 += "\n    <label class=\"form-check-label\" for=\"";
t_18 += runtime.suppressValue(l_id, env.opts.autoescape);
t_18 += "\">\n        ";
if(runtime.contextOrFrameLookup(context, frame, "altered_name") == "") {
t_18 += "\n            ";
t_18 += runtime.suppressValue(l_name, env.opts.autoescape);
t_18 += "\n        ";
;
}
else {
t_18 += "\n            ";
t_18 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "altered_name"), env.opts.autoescape);
t_18 += "\n        ";
;
}
t_18 += "\n    </label>\n</div>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_18);
});
context.addExport("toggle_input");
context.setVariable("toggle_input", macro_t_17);
output += "\n\n";
var macro_t_19 = runtime.makeMacro(
["id", "name", "min_value", "max_value"], 
[], 
function (l_id, l_name, l_min_value, l_max_value, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("id", l_id);
frame.set("name", l_name);
frame.set("min_value", l_min_value);
frame.set("max_value", l_max_value);
var t_20 = "";t_20 += "\n    <input type=\"range\"\n        name=\"";
t_20 += runtime.suppressValue(l_id, env.opts.autoescape);
t_20 += "\"\n        id=\"";
t_20 += runtime.suppressValue(l_id, env.opts.autoescape);
t_20 += "\"\n        display_name=\"";
t_20 += runtime.suppressValue(l_name, env.opts.autoescape);
t_20 += "\"\n        min=\"";
t_20 += runtime.suppressValue(l_min_value, env.opts.autoescape);
t_20 += "\"\n        max=\"";
t_20 += runtime.suppressValue(l_max_value, env.opts.autoescape);
t_20 += "\"\n        style=\"width: 80%\"\n        class=\"pretty-slider\"\n        list=\"";
t_20 += runtime.suppressValue(l_id, env.opts.autoescape);
t_20 += "_tickmarks\">\n    <datalist id=\"";
t_20 += runtime.suppressValue(l_id, env.opts.autoescape);
t_20 += "_tickmarks\" style=\"width: 80%; margin-top: -10px\" class=\"d-flex justify-content-between mx-auto px-1\">\n        ";
frame = frame.push();
var t_23 = (lineno = 245, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [l_min_value,l_max_value + 1]));
if(t_23) {t_23 = runtime.fromIterator(t_23);
var t_22 = t_23.length;
for(var t_21=0; t_21 < t_23.length; t_21++) {
var t_24 = t_23[t_21];
frame.set("val", t_24);
frame.set("loop.index", t_21 + 1);
frame.set("loop.index0", t_21);
frame.set("loop.revindex", t_22 - t_21);
frame.set("loop.revindex0", t_22 - t_21 - 1);
frame.set("loop.first", t_21 === 0);
frame.set("loop.last", t_21 === t_22 - 1);
frame.set("loop.length", t_22);
t_20 += "\n            <option value=\"";
t_20 += runtime.suppressValue(t_24, env.opts.autoescape);
t_20 += "\" label=\"";
t_20 += runtime.suppressValue(t_24, env.opts.autoescape);
t_20 += "\"></option>\n        ";
;
}
}
frame = frame.pop();
t_20 += "\n    </datalist>\n    <script>\n        [\"change\", \"input\", \"load\"].forEach(evt => {\n            document.getElementById(\"";
t_20 += runtime.suppressValue(l_id, env.opts.autoescape);
t_20 += "\").addEventListener(evt, (e) => {\n                const targ_value = e.target.value;\n                const targ_min = e.target.getAttribute(\"min\");\n                const targ_max = e.target.getAttribute(\"max\");\n                const targ_delta = targ_max - targ_min;\n                const value_delta = targ_value - targ_min;\n                e.target.style.setProperty(\"--p\", `${parseInt(100 * (value_delta / targ_delta))}%`)\n            })\n        })\n    </script>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_20);
});
context.addExport("slider_input");
context.setVariable("slider_input", macro_t_19);
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["music.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("macros.html", false, "music.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "list_selector")) {
var t_4 = t_1.list_selector;
} else {
cb(new Error("cannot import 'list_selector'")); return;
}
context.setVariable("list_selector", t_4);
if(Object.prototype.hasOwnProperty.call(t_1, "toggle_input")) {
var t_5 = t_1.toggle_input;
} else {
cb(new Error("cannot import 'toggle_input'")); return;
}
context.setVariable("toggle_input", t_5);
output += "\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div class=\"row\">\n        <div class=\"col border panel\">\n            <h2 class=\"title\">MUSIC RANDO\n                <label data-toggle=\"tooltip\" \n                        title=\"Randomizes all Music Selections.\">\n                    <input class=\"dice_checkbox\"\n                            type=\"checkbox\"\n                            name=\"random_music\"\n                            id=\"random_music\"\n                            display_name=\"Random Music\"\n                            value=\"True\"/>\n                    <label for=\"random_music\"></label>\n                </label>\n            </h2>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Randomizes Background Music.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"music_bgm_randomized\"\n                                id=\"music_bgm_randomized\"\n                                display_name=\"Random Background Music\"\n                                value=\"True\"/>\n                        Random Background Music\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Randomizes Major Item Themes.\">\n                        <input class=\"form-check-input\"\n                            type=\"checkbox\"\n                            name=\"music_majoritems_randomized\"\n                            id=\"music_majoritems_randomized\"\n                            display_name=\"Random Major Item Themes\"\n                            value=\"True\"/>\n                        Random Major Item Themes\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Randomizes Minor Item Themes.\">\n                        <input class=\"form-check-input\"\n                            type=\"checkbox\"\n                            name=\"music_minoritems_randomized\"\n                            id=\"music_minoritems_randomized\"\n                            display_name=\"Random Minor Item Themes\"\n                            value=\"True\"/>\n                        Random Minor Item Themes\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Randomizes Event Themes.\">\n                        <input class=\"form-check-input\"\n                            type=\"checkbox\"\n                            name=\"music_events_randomized\"\n                            id=\"music_events_randomized\"\n                            display_name=\"Random Event Themes\"\n                            value=\"True\"/>\n                        Random Event Themes\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"If true, vanilla songs will not be shuffled anywhere but their original locations.\">\n                        <input class=\"form-check-input\"\n                            type=\"checkbox\"\n                            name=\"music_vanilla_locations\"\n                            id=\"music_vanilla_locations\"\n                            display_name=\"Keep Vanilla Song Placement\"\n                            value=\"True\"/>\n                        Keep Vanilla Song Placement\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"This option disables various songs.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"songs_excluded\"\n                               id=\"songs_excluded\"\n                               display_name=\"Disabled Songs\"\n                               value=\"True\"/>\n                        Disabled Songs\n                    </label>\n                    ";
output += runtime.suppressValue((lineno = 88, colno = 36, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "excluded_songs"),"excluded_songs","Disabled Songs","This will open a popup that will let you customize what songs are disabled.",4])), env.opts.autoescape);
output += "\n                    ";
output += "\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"If true, songs will not have additional reverb while underwater or in tunnels.\">\n                        <input class=\"form-check-input\"\n                            type=\"checkbox\"\n                            name=\"music_disable_reverb\"\n                            id=\"music_disable_reverb\"\n                            display_name=\"Disable Dynamic Reverb\"\n                            value=\"True\"/>\n                        Disable Dynamic Reverb\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"This option enables music filtering options for .candy files.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"music_filtering\"\n                               id=\"music_filtering\"\n                               display_name=\"Music Filtering\"\n                               value=\"True\" checked/>\n                        Music Filtering\n                    </label>\n                    ";
output += runtime.suppressValue((lineno = 113, colno = 36, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "song_filters"),"music_filtering","Music Filtering","This will open a popup that will let you customize how the game applies additional filters.",2,1,"These filters only work for .candy files."])), env.opts.autoescape);
output += "\n                    ";
output += "\n            </div>\n        </div>\n        <div class=\"col border panel\">\n            <h2 class=\"title\">CUSTOM MUSIC</h2>\n            <p class=\"select-title\">Cosmetics ZIP (Check <a style=\"text-decoration:underline\" target=\"_blank\" href=\"./wiki/Creating-Cosmetics-Data-packs.html\">wiki</a> for format)</p>\n            <div class=\"input-group mb-3 file-select\"\n                 style=\"margin: 0 auto\">\n                <div class=\"input-group-text choose-file\"\n                     style=\"background-color: #6c757d\">\n                    <input class=\"btn btn-secondary file-button\"\n                           type=\"button\"\n                           value=\"Choose File\"\n                           onClick=\"music_filebox()\"\n                           id=\"choose_music_file\">\n                </div>\n                <input class=\"form-control\"\n                       id=\"music_file_text\"\n                       type=\"text\"\n                       readonly\n                       onClick=\"music_filebox()\"\n                       placeholder=\"No File Chosen\"/>\n            </div>\n            <div class=\"flex-container\">\n                ";
output += runtime.suppressValue((lineno = 138, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["fill_with_custom_music","Fill game with provided songs","Will fill each song slot available with a custom track, even if the amount of songs in that pack doesn't exceed the amount of song slots."])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 139, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["show_song_name","Display song name in-game","Will display the song name for 2 seconds upon it playing (Only applies to BGM)."])), env.opts.autoescape);
output += "\n            </div>\n            <div class=\"flex-container\">\n                <div style=\"width:50%\">\n                    <div class=\"item-group\" style=\"margin-left:auto;margin-right:auto;max-width:200px;\">\n                        <p class=\"select-title\">Custom Music Fill (%)</p>\n                        <input class=\"form-control\"\n                            min=\"0\"\n                            max=\"100\"\n                            name=\"custom_music_proportion\"\n                            id=\"custom_music_proportion\"\n                            display_name=\"Custom Music Fill\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"Proportion of songs that will be filled with custom music.\"\n                            default=\"100\"\n                            placeholder=\"100\"/>\n                    </div>\n                </div>\n                <div class=\"spacer\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"container border\"\n     id=\"select_songs_panel\"\n     style=\"padding-bottom: 24px;\">\n    <h2 class=\"title\">Select Songs</h2>\n    <div class=\"flex-container flex-center import-export-container\">\n        <input id=\"import_music_selections\"\n               class=\"btn btn-secondary settings-button\"\n               type=\"button\"\n               onClick=\"music_selection_filebox()\"\n               value=\"Import Selections from File\"/>\n        <input id=\"export_music_selections\"\n               class=\"btn btn-secondary settings-button\"\n               type=\"button\"\n               value=\"Export Selections to File\"/>\n        <input id=\"reset_music_selections\"\n               class=\"btn btn-secondary settings-button\"\n               type=\"button\"\n               value=\"Reset Selections\"/>\n    </div>\n    <div class=\"import-errors\"\n         id=\"music_import_errors\"\n         style=\"display: none;\">\n    </div>\n    <div>\n        ";
frame = frame.push();
var t_8 = runtime.contextOrFrameLookup(context, frame, "select_song_panel");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_6;
if(runtime.isArray(t_8)) {
var t_7 = t_8.length;
for(t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6][0];
frame.set("[object Object]", t_8[t_6][0]);
var t_10 = t_8[t_6][1];
frame.set("[object Object]", t_8[t_6][1]);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n            <div class=\"flex-container flex-center expandable-toggle\"\n                 id=\"";
output += runtime.suppressValue(t_9, env.opts.autoescape);
output += "_collapse_toggle\">\n                <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_10),"name"), env.opts.autoescape);
output += "</h3>\n                <img src=\"static/img/expand_arrow.png\"\n                     class=\"expand-arrow ";
output += runtime.suppressValue(t_9, env.opts.autoescape);
output += "-expand-arrow\">\n            </div>\n            <div class=\"flex-container flex-center expandable-container collapsed\"\n                 id=\"";
output += runtime.suppressValue(t_9, env.opts.autoescape);
output += "\">\n                ";
frame = frame.push();
var t_13 = runtime.memberLookup((t_10),"subcategories");
if(t_13) {t_13 = runtime.fromIterator(t_13);
var t_11;
if(runtime.isArray(t_13)) {
var t_12 = t_13.length;
for(t_11=0; t_11 < t_13.length; t_11++) {
var t_14 = t_13[t_11][0];
frame.set("[object Object]", t_13[t_11][0]);
var t_15 = t_13[t_11][1];
frame.set("[object Object]", t_13[t_11][1]);
frame.set("loop.index", t_11 + 1);
frame.set("loop.index0", t_11);
frame.set("loop.revindex", t_12 - t_11);
frame.set("loop.revindex0", t_12 - t_11 - 1);
frame.set("loop.first", t_11 === 0);
frame.set("loop.last", t_11 === t_12 - 1);
frame.set("loop.length", t_12);
output += "\n                    <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_15),"name"), env.opts.autoescape);
output += "</h3>\n                    <div class=\"flex-container flex-center\">\n                        ";
frame = frame.push();
var t_18 = runtime.memberLookup((t_15),"songs");
if(t_18) {t_18 = runtime.fromIterator(t_18);
var t_17 = t_18.length;
for(var t_16=0; t_16 < t_18.length; t_16++) {
var t_19 = t_18[t_16];
frame.set("song", t_19);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
output += "\n                            <div class=\"location-picker\">\n                                <label for=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "\" class=\"location-label\">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_19),"name"), env.opts.autoescape);
output += "\n                                </label>\n                                <div id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_wrapper\"\n                                    data-toggle=\"tooltip\"\n                                    title>\n                                    <select id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "\"\n                                            name=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "\"\n                                            class=\"form-select ";
output += runtime.suppressValue(runtime.memberLookup((t_15),"type"), env.opts.autoescape);
output += "-select\">\n                                        <option value=\"default_value\">-- Default --</option>\n                                        <option value=\"\" selected>-- Randomize --</option>\n                                        ";
frame = frame.push();
var t_22 = env.getFilter("music_select_restrict").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "select_songs")),runtime.memberLookup((t_15),"type")),runtime.memberLookup((t_19),"value"));
if(t_22) {t_22 = runtime.fromIterator(t_22);
var t_21 = t_22.length;
for(var t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20];
frame.set("select_song", t_23);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
output += "\n                                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_23),"value"), env.opts.autoescape);
output += "\"\n                                                    class=\"original-song\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_23),"name"), env.opts.autoescape);
output += "\n                                            </option>\n                                        ";
;
}
}
frame = frame.pop();
output += "\n                                    </select>\n                                </div>\n                            </div>\n                        ";
;
}
}
frame = frame.pop();
output += "\n                    </div>\n                ";
;
}
} else {
t_11 = -1;
var t_12 = runtime.keys(t_13).length;
for(var t_24 in t_13) {
t_11++;
var t_25 = t_13[t_24];
frame.set("subCatName", t_24);
frame.set("subCategory", t_25);
frame.set("loop.index", t_11 + 1);
frame.set("loop.index0", t_11);
frame.set("loop.revindex", t_12 - t_11);
frame.set("loop.revindex0", t_12 - t_11 - 1);
frame.set("loop.first", t_11 === 0);
frame.set("loop.last", t_11 === t_12 - 1);
frame.set("loop.length", t_12);
output += "\n                    <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_25),"name"), env.opts.autoescape);
output += "</h3>\n                    <div class=\"flex-container flex-center\">\n                        ";
frame = frame.push();
var t_28 = runtime.memberLookup((t_25),"songs");
if(t_28) {t_28 = runtime.fromIterator(t_28);
var t_27 = t_28.length;
for(var t_26=0; t_26 < t_28.length; t_26++) {
var t_29 = t_28[t_26];
frame.set("song", t_29);
frame.set("loop.index", t_26 + 1);
frame.set("loop.index0", t_26);
frame.set("loop.revindex", t_27 - t_26);
frame.set("loop.revindex0", t_27 - t_26 - 1);
frame.set("loop.first", t_26 === 0);
frame.set("loop.last", t_26 === t_27 - 1);
frame.set("loop.length", t_27);
output += "\n                            <div class=\"location-picker\">\n                                <label for=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_29),"value"), env.opts.autoescape);
output += "\" class=\"location-label\">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_29),"name"), env.opts.autoescape);
output += "\n                                </label>\n                                <div id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_29),"value"), env.opts.autoescape);
output += "_wrapper\"\n                                    data-toggle=\"tooltip\"\n                                    title>\n                                    <select id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_29),"value"), env.opts.autoescape);
output += "\"\n                                            name=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_29),"value"), env.opts.autoescape);
output += "\"\n                                            class=\"form-select ";
output += runtime.suppressValue(runtime.memberLookup((t_25),"type"), env.opts.autoescape);
output += "-select\">\n                                        <option value=\"default_value\">-- Default --</option>\n                                        <option value=\"\" selected>-- Randomize --</option>\n                                        ";
frame = frame.push();
var t_32 = env.getFilter("music_select_restrict").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "select_songs")),runtime.memberLookup((t_25),"type")),runtime.memberLookup((t_29),"value"));
if(t_32) {t_32 = runtime.fromIterator(t_32);
var t_31 = t_32.length;
for(var t_30=0; t_30 < t_32.length; t_30++) {
var t_33 = t_32[t_30];
frame.set("select_song", t_33);
frame.set("loop.index", t_30 + 1);
frame.set("loop.index0", t_30);
frame.set("loop.revindex", t_31 - t_30);
frame.set("loop.revindex0", t_31 - t_30 - 1);
frame.set("loop.first", t_30 === 0);
frame.set("loop.last", t_30 === t_31 - 1);
frame.set("loop.length", t_31);
output += "\n                                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_33),"value"), env.opts.autoescape);
output += "\"\n                                                    class=\"original-song\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_33),"name"), env.opts.autoescape);
output += "\n                                            </option>\n                                        ";
;
}
}
frame = frame.pop();
output += "\n                                    </select>\n                                </div>\n                            </div>\n                        ";
;
}
}
frame = frame.pop();
output += "\n                    </div>\n                ";
;
}
}
}
frame = frame.pop();
output += "\n            </div>\n        ";
;
}
} else {
t_6 = -1;
var t_7 = runtime.keys(t_8).length;
for(var t_34 in t_8) {
t_6++;
var t_35 = t_8[t_34];
frame.set("categoryName", t_34);
frame.set("category", t_35);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n            <div class=\"flex-container flex-center expandable-toggle\"\n                 id=\"";
output += runtime.suppressValue(t_34, env.opts.autoescape);
output += "_collapse_toggle\">\n                <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_35),"name"), env.opts.autoescape);
output += "</h3>\n                <img src=\"static/img/expand_arrow.png\"\n                     class=\"expand-arrow ";
output += runtime.suppressValue(t_34, env.opts.autoescape);
output += "-expand-arrow\">\n            </div>\n            <div class=\"flex-container flex-center expandable-container collapsed\"\n                 id=\"";
output += runtime.suppressValue(t_34, env.opts.autoescape);
output += "\">\n                ";
frame = frame.push();
var t_38 = runtime.memberLookup((t_35),"subcategories");
if(t_38) {t_38 = runtime.fromIterator(t_38);
var t_36;
if(runtime.isArray(t_38)) {
var t_37 = t_38.length;
for(t_36=0; t_36 < t_38.length; t_36++) {
var t_39 = t_38[t_36][0];
frame.set("[object Object]", t_38[t_36][0]);
var t_40 = t_38[t_36][1];
frame.set("[object Object]", t_38[t_36][1]);
frame.set("loop.index", t_36 + 1);
frame.set("loop.index0", t_36);
frame.set("loop.revindex", t_37 - t_36);
frame.set("loop.revindex0", t_37 - t_36 - 1);
frame.set("loop.first", t_36 === 0);
frame.set("loop.last", t_36 === t_37 - 1);
frame.set("loop.length", t_37);
output += "\n                    <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_40),"name"), env.opts.autoescape);
output += "</h3>\n                    <div class=\"flex-container flex-center\">\n                        ";
frame = frame.push();
var t_43 = runtime.memberLookup((t_40),"songs");
if(t_43) {t_43 = runtime.fromIterator(t_43);
var t_42 = t_43.length;
for(var t_41=0; t_41 < t_43.length; t_41++) {
var t_44 = t_43[t_41];
frame.set("song", t_44);
frame.set("loop.index", t_41 + 1);
frame.set("loop.index0", t_41);
frame.set("loop.revindex", t_42 - t_41);
frame.set("loop.revindex0", t_42 - t_41 - 1);
frame.set("loop.first", t_41 === 0);
frame.set("loop.last", t_41 === t_42 - 1);
frame.set("loop.length", t_42);
output += "\n                            <div class=\"location-picker\">\n                                <label for=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_44),"value"), env.opts.autoescape);
output += "\" class=\"location-label\">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_44),"name"), env.opts.autoescape);
output += "\n                                </label>\n                                <div id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_44),"value"), env.opts.autoescape);
output += "_wrapper\"\n                                    data-toggle=\"tooltip\"\n                                    title>\n                                    <select id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_44),"value"), env.opts.autoescape);
output += "\"\n                                            name=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_44),"value"), env.opts.autoescape);
output += "\"\n                                            class=\"form-select ";
output += runtime.suppressValue(runtime.memberLookup((t_40),"type"), env.opts.autoescape);
output += "-select\">\n                                        <option value=\"default_value\">-- Default --</option>\n                                        <option value=\"\" selected>-- Randomize --</option>\n                                        ";
frame = frame.push();
var t_47 = env.getFilter("music_select_restrict").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "select_songs")),runtime.memberLookup((t_40),"type")),runtime.memberLookup((t_44),"value"));
if(t_47) {t_47 = runtime.fromIterator(t_47);
var t_46 = t_47.length;
for(var t_45=0; t_45 < t_47.length; t_45++) {
var t_48 = t_47[t_45];
frame.set("select_song", t_48);
frame.set("loop.index", t_45 + 1);
frame.set("loop.index0", t_45);
frame.set("loop.revindex", t_46 - t_45);
frame.set("loop.revindex0", t_46 - t_45 - 1);
frame.set("loop.first", t_45 === 0);
frame.set("loop.last", t_45 === t_46 - 1);
frame.set("loop.length", t_46);
output += "\n                                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_48),"value"), env.opts.autoescape);
output += "\"\n                                                    class=\"original-song\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_48),"name"), env.opts.autoescape);
output += "\n                                            </option>\n                                        ";
;
}
}
frame = frame.pop();
output += "\n                                    </select>\n                                </div>\n                            </div>\n                        ";
;
}
}
frame = frame.pop();
output += "\n                    </div>\n                ";
;
}
} else {
t_36 = -1;
var t_37 = runtime.keys(t_38).length;
for(var t_49 in t_38) {
t_36++;
var t_50 = t_38[t_49];
frame.set("subCatName", t_49);
frame.set("subCategory", t_50);
frame.set("loop.index", t_36 + 1);
frame.set("loop.index0", t_36);
frame.set("loop.revindex", t_37 - t_36);
frame.set("loop.revindex0", t_37 - t_36 - 1);
frame.set("loop.first", t_36 === 0);
frame.set("loop.last", t_36 === t_37 - 1);
frame.set("loop.length", t_37);
output += "\n                    <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_50),"name"), env.opts.autoescape);
output += "</h3>\n                    <div class=\"flex-container flex-center\">\n                        ";
frame = frame.push();
var t_53 = runtime.memberLookup((t_50),"songs");
if(t_53) {t_53 = runtime.fromIterator(t_53);
var t_52 = t_53.length;
for(var t_51=0; t_51 < t_53.length; t_51++) {
var t_54 = t_53[t_51];
frame.set("song", t_54);
frame.set("loop.index", t_51 + 1);
frame.set("loop.index0", t_51);
frame.set("loop.revindex", t_52 - t_51);
frame.set("loop.revindex0", t_52 - t_51 - 1);
frame.set("loop.first", t_51 === 0);
frame.set("loop.last", t_51 === t_52 - 1);
frame.set("loop.length", t_52);
output += "\n                            <div class=\"location-picker\">\n                                <label for=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_54),"value"), env.opts.autoescape);
output += "\" class=\"location-label\">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_54),"name"), env.opts.autoescape);
output += "\n                                </label>\n                                <div id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_54),"value"), env.opts.autoescape);
output += "_wrapper\"\n                                    data-toggle=\"tooltip\"\n                                    title>\n                                    <select id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_54),"value"), env.opts.autoescape);
output += "\"\n                                            name=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_54),"value"), env.opts.autoescape);
output += "\"\n                                            class=\"form-select ";
output += runtime.suppressValue(runtime.memberLookup((t_50),"type"), env.opts.autoescape);
output += "-select\">\n                                        <option value=\"default_value\">-- Default --</option>\n                                        <option value=\"\" selected>-- Randomize --</option>\n                                        ";
frame = frame.push();
var t_57 = env.getFilter("music_select_restrict").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "select_songs")),runtime.memberLookup((t_50),"type")),runtime.memberLookup((t_54),"value"));
if(t_57) {t_57 = runtime.fromIterator(t_57);
var t_56 = t_57.length;
for(var t_55=0; t_55 < t_57.length; t_55++) {
var t_58 = t_57[t_55];
frame.set("select_song", t_58);
frame.set("loop.index", t_55 + 1);
frame.set("loop.index0", t_55);
frame.set("loop.revindex", t_56 - t_55);
frame.set("loop.revindex0", t_56 - t_55 - 1);
frame.set("loop.first", t_55 === 0);
frame.set("loop.last", t_55 === t_56 - 1);
frame.set("loop.length", t_56);
output += "\n                                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_58),"value"), env.opts.autoescape);
output += "\"\n                                                    class=\"original-song\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_58),"name"), env.opts.autoescape);
output += "\n                                            </option>\n                                        ";
;
}
}
frame = frame.pop();
output += "\n                                    </select>\n                                </div>\n                            </div>\n                        ";
;
}
}
frame = frame.pop();
output += "\n                    </div>\n                ";
;
}
}
}
frame = frame.pop();
output += "\n            </div>\n        ";
;
}
}
}
frame = frame.pop();
output += "\n    </div>\n</div>\n<script>\n    $(function() {\n        var pattern = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];\n        var current = 0;\n\n        var keyHandler = function (event) {\n            // If the key isn't in the pattern, or isn't the current key in the pattern, reset\n            if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {\n                current = 0;\n                return;\n            }\n            // Update how much of the pattern is complete\n            current++;\n            // If complete, remove hidden and reset\n            if (pattern.length === current) {\n                current = 0;\n                $('.holiday').removeAttr('hidden');\n            }\n        };\n        // Listen for keydown events\n        document.addEventListener('keydown', keyHandler, false);\n    })\n</script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["nav-tabs.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<nav id=\"rando_tabs\">\n    <div class=\"d-flex\">\n        <div class=\"nav nav-tabs flex-container flex-grow-1\" id=\"nav-tab\" role=\"tablist\" style=\"border-bottom:none\">\n            <button class=\"nav-link bg-body active nav-item\"\n                    id=\"nav-started-tab\"\n                    data-bs-toggle=\"tab\"\n                    data-bs-target=\"#nav-started\"\n                    type=\"button\"\n                    role=\"tab\"\n                    aria-controls=\"nav-started\"\n                    aria-selected=\"true\">\n                <p class=\"select-title d-flex\">\n                    <i class=\"fa-solid fa-bars-progress fa-xl\"></i>\n                    <span class=\"tab-full-name\">Getting Started</span>\n                </p>\n            </button>\n            <button class=\"nav-link bg-body nav-item\"\n                    id=\"nav-random-tab\"\n                    data-bs-toggle=\"tab\"\n                    data-bs-target=\"#nav-random\"\n                    type=\"button\"\n                    role=\"tab\"\n                    aria-controls=\"nav-random\"\n                    aria-selected=\"false\">\n                <p class=\"select-title d-flex\">\n                    <i class=\"fa-solid fa-dice-six fa-xl\"></i>\n                    <span class=\"tab-full-name\">Randomizers</span>\n                </p>\n            </button>\n            <button class=\"nav-link bg-body nav-item\"\n                    id=\"nav-overworld-tab\"\n                    data-bs-toggle=\"tab\"\n                    data-bs-target=\"#nav-overworld\"\n                    type=\"button\"\n                    role=\"tab\"\n                    aria-controls=\"nav-overworld\"\n                    aria-selected=\"false\">\n                <p class=\"select-title d-flex\">\n                    <i class=\"fa-solid fa-globe fa-xl\"></i>\n                    <span class=\"tab-full-name\">Overworld</span>\n                </p>\n            </button>\n            <button class=\"nav-link bg-body nav-item\"\n                    id=\"nav-progression-tab\"\n                    data-bs-toggle=\"tab\"\n                    data-bs-target=\"#nav-progression\"\n                    type=\"button\"\n                    role=\"tab\"\n                    aria-controls=\"nav-progression\"\n                    aria-selected=\"false\">\n                <p class=\"select-title d-flex\">\n                    <i class=\"fa-solid fa-arrows-turn-to-dots fa-xl\"></i>\n                    <span class=\"tab-full-name\">Progression</span>\n                </p>\n            </button>\n            <button class=\"nav-link bg-body nav-item\"\n                    id=\"nav-qol-tab\"\n                    data-bs-toggle=\"tab\"\n                    data-bs-target=\"#nav-qol\"\n                    type=\"button\"\n                    role=\"tab\"\n                    aria-controls=\"nav-qol\"\n                    aria-selected=\"false\">\n                <p class=\"select-title d-flex\">\n                    <i class=\"fa-solid fa-thumbs-up fa-xl\"></i>\n                    <span class=\"tab-full-name\">Quality of Life</span>\n                </p>\n            </button>\n            <button class=\"nav-link bg-body nav-item\"\n                    id=\"nav-cosmetics-tab\"\n                    data-bs-toggle=\"tab\"\n                    data-bs-target=\"#nav-cosmetics\"\n                    type=\"button\"\n                    role=\"tab\"\n                    aria-controls=\"nav-cosmetics\"\n                    aria-selected=\"false\">\n                <p class=\"select-title d-flex\">\n                    <i class=\"fa-solid fa-palette fa-xl\"></i>\n                    <span class=\"tab-full-name\">Cosmetics</span>\n                </p>\n            </button>\n            <button class=\"nav-link bg-body nav-item\"\n                    id=\"nav-music-tab\"\n                    data-bs-toggle=\"tab\"\n                    data-bs-target=\"#nav-music\"\n                    type=\"button\"\n                    role=\"tab\"\n                    aria-controls=\"nav-music\"\n                    aria-selected=\"false\">\n                <p class=\"select-title d-flex\">\n                    <i class=\"fa-solid fa-music fa-xl\"></i>\n                    <span class=\"tab-full-name\">Music</span>\n                </p>\n            </button>\n            <button class=\"nav-link bg-body nav-item\"\n                    style=\"display: none;\"\n                    id=\"nav-plando-tab\"\n                    data-bs-toggle=\"tab\"\n                    data-bs-target=\"#nav-plando\"\n                    type=\"button\"\n                    role=\"tab\"\n                    aria-controls=\"nav-plando\"\n                    aria-selected=\"false\">\n                <p class=\"select-title d-flex\">\n                    <i class=\"fa-solid fa-scroll fa-xl\"></i>\n                    <span class=\"tab-full-name\">Plandomizer</span>\n                </p>\n            </button>\n            <button class=\"nav-link bg-body nav-item\"\n                    id=\"nav-settings-tab\"\n                    data-bs-toggle=\"tab\"\n                    data-bs-target=\"#nav-settings\"\n                    type=\"button\"\n                    role=\"tab\"\n                    aria-controls=\"nav-settings\"\n                    style=\"display: none\"\n                    aria-selected=\"false\">\n                <p class=\"select-title d-flex\">\n                    <i class=\"fa-solid fa-circle-info fa-xl\"></i>\n                    <span class=\"tab-full-name\">Seed Info</span>\n                </p>\n            </button>\n        </div>\n        ";
output += "\n    </div>\n</nav>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["overworld.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("macros.html", false, "overworld.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "list_selector")) {
var t_4 = t_1.list_selector;
} else {
cb(new Error("cannot import 'list_selector'")); return;
}
context.setVariable("list_selector", t_4);
if(Object.prototype.hasOwnProperty.call(t_1, "properties_selector")) {
var t_5 = t_1.properties_selector;
} else {
cb(new Error("cannot import 'properties_selector'")); return;
}
context.setVariable("properties_selector", t_5);
output += "\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div class=\"row\">\n        <div class=\"col border panel\">\n            <h2 class=\"title\">GLOBAL SETTINGS</h2>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Bonus Barrels outside of Helm auto complete.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"bonus_barrel_auto_complete\"\n                               id=\"bonus_barrel_auto_complete\"\n                               display_name=\"Auto Complete Bonus Barrels\"\n                               value=\"True\"/>\n                        Auto Complete Bonus Barrels\n                    </label>\n                </div>\n                    <div class=\"form-check form-switch item-switch\">\n                        <label data-toggle=\"tooltip\"\n                               title=\"All lobbies will be open as if the key to K. Lumsy was already turned in.&#10;This does not affect K. Rool's ship.\">\n                            <input class=\"form-check-input\"\n                                   type=\"checkbox\"\n                                   name=\"open_lobbies\"\n                                   display_name=\"Open Lobbies\"\n                                   value=\"True\"/>\n                            Open Lobbies\n                        </label>\n                    </div>\n                    <div class=\"form-check form-switch item-switch\">\n                        <label data-toggle=\"tooltip\"\n                            title=\"Various barriers to progression will be removed.\">\n                            <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"remove_barriers_enabled\"\n                                id=\"remove_barriers_enabled\"\n                                display_name=\"Remove Barriers\"\n                                value=\"True\"/>\n                            Remove Barriers\n                        </label>\n                        ";
output += runtime.suppressValue((lineno = 40, colno = 40, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "remove_barriers"),"remove_barriers","REMOVE BARRIERS","This will open a popup that will let you customize what barriers are removed.&#10;This defaults to All options.",12,1])), env.opts.autoescape);
output += "\n                        ";
output += "\n                    <div class=\"form-check form-switch item-switch\">\n                        <label data-toggle=\"tooltip\"\n                               title=\"Simian Slam switches will be adjusted to match the level order so that tougher switches will always be in later levels.&#10;The first four levels will have green switches, the next two will have blue and the final level will have red switches.&#10;In LZR, these are assigned to random levels with no regard for level order.\">\n                            <input class=\"form-check-input\"\n                                   type=\"checkbox\"\n                                   name=\"alter_switch_allocation\"\n                                   display_name=\"Progressive Switch Strength\"\n                                   value=\"True\"/>\n                            Progressive Switch Strength\n                        </label>\n                    </div>\n                    <div class=\"form-check form-switch item-switch\">\n                        <label data-toggle=\"tooltip\"\n                            title=\"Speeds up several of the 'Slower' Checks in the game.\">\n                            <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"faster_checks_enabled\"\n                                id=\"faster_checks_enabled\"\n                                display_name=\"Faster Checks\"\n                                value=\"True\"/>\n                            Faster Checks\n                        </label>\n                        ";
output += runtime.suppressValue((lineno = 64, colno = 40, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "faster_checks"),"faster_checks","FASTER CHECKS","This will open a popup that will let you customize what checks are sped up.&#10;This defaults to All options.",12,1])), env.opts.autoescape);
output += "\n                        ";
output += "\n                    <div class=\"form-check form-switch item-switch\">\n                        <label data-toggle=\"tooltip\"\n                               title=\"Donkey Kong 64 with a few twists:&#10;- Hideout Helm timer starts as soon as you load up a file.&#10;- Picking up a blueprint gives you 2 extra minutes on the clock. Each kong freed gives you 5 minutes. Every Golden Banana collected gives you 30 seconds.&#10;- As soon as the time runs out, saving is disabled on your file.&#10;Aim is to get the highest percentage you can before the clock runs out.\">\n                            <input class=\"form-check-input\"\n                                   type=\"checkbox\"\n                                   name=\"helm_hurry\"\n                                   id=\"helm_hurry\"\n                                   display_name=\"Helm Hurry Mode\"\n                                   value=\"True\"/>\n                            Helm Hurry Mode\n                        </label>\n                        ";
output += runtime.suppressValue((lineno = 77, colno = 46, runtime.callWrap(t_5, "properties_selector", context, [runtime.contextOrFrameLookup(context, frame, "helm_hurry_items"),"helmhurry_list","HELM HURRY SELECTOR","This will open a popup that will let you customize what how much time each item will give you."])), env.opts.autoescape);
output += "\n                    <div class=\"form-check form-switch item-switch\">\n                        <label data-toggle=\"tooltip\"\n                            title=\"Item rando with shops only. Reduces the number of items offered in shops to a maximum of 3.\"\n                            style=\"text-align: left\">\n                            <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"smaller_shops\"\n                                id=\"smaller_shops\"\n                                display_name=\"Smaller Shops\"\n                                value=\"True\"/>\n                            Smaller Shops\n                        </label>\n                    </div>\n                    <div class=\"spacer\"></div>\n                    </div>\n                    <div class=\"flex-container\">\n                        <div class=\"item-select\">\n                            <p class=\"select-title\">Logic</p>\n                            <div class=\"customize-select\">\n                            <select name=\"logic_type\"\n                                    id=\"logic_type\"\n                                    display_name=\"Logic\"\n                                    class=\"form-select\"\n                                    aria-label=\"Logic\"\n                                    data-toggle=\"tooltip\"\n                                    title=\"If this is checked, then locations and entrances will be shuffled without logic.&#10;WARNING: This can lead to unbeatable seeds, or seeds that require a high level of glitch knowledge to complete.\">\n                                <option id=\"glitchless\" selected value=\"glitchless\">\n                                    Glitchless Logic\n                                </option>\n                                <option id=\"glitch\" value=\"glitch\">\n                                    Glitch Logic\n                                </option>\n                                <option id=\"nologic\" value=\"nologic\">\n                                    No Logic\n                                </option>\n                            </select>\n                            <div style=\"padding: 5px;\">\n                                ";
output += runtime.suppressValue((lineno = 115, colno = 48, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "glitches"),"glitches","GLITCHES","This will open a popup that will let you customize what tricks are considered by logic with glitch logic.&#10;This defaults to All options.",16,1])), env.opts.autoescape);
output += "\n                                ";
output += "\n                            </div>\n                        </div>\n                        <div class=\"item-select\">\n                            <p class=\"select-title\">Win Condition</p>\n                            <div class=\"d-flex select-number-container\" id=\"win_condition_container\">\n                                <select name=\"win_condition_item\"\n                                        id=\"win_condition_item\"\n                                        display_name=\"Win Condition\"\n                                        class=\"form-select center-div\"\n                                        aria-label=\"Win Condition\"\n                                        data-toggle=\"tooltip\"\n                                        title=\"Alter the condition required to show the credits.\">\n                                    <option selected id=\"beat_krool\" value=\"beat_krool\" title=\"\">\n                                        Beat K Rool\n                                    </option>\n                                    <option id=\"get_key8\" value=\"get_key8\">\n                                        Acquire Key 8\n                                    </option>\n                                    <option id=\"krem_kapture\" value=\"krem_kapture\" title=\"Photograph all enemies using the fairy camera\">\n                                        Kremling Kapture\n                                    </option>\n                                    <option id=\"dk_rap_items\" value=\"dk_rap_items\" title=\"Acquire all items referenced in the DK Rap\">\n                                        Complete the DK Rap\n                                    </option>\n                                    <option id=\"easy_random\" value=\"easy_random\">\n                                        Random (Easy)\n                                    </option>\n                                    <option id=\"medium_random\" value=\"medium_random\">\n                                        Random (Medium)\n                                    </option>\n                                    <option id=\"hard_random\" value=\"hard_random\">\n                                        Random (Hard)\n                                    </option>\n                                    <option id=\"req_gb\" value=\"req_gb\">\n                                        Golden Bananas\n                                    </option>\n                                    <option id=\"req_bp\" value=\"req_bp\">\n                                        Blueprints\n                                    </option>\n                                    <option id=\"req_key\" value=\"req_key\">\n                                        Keys\n                                    </option>\n                                    <option id=\"req_medal\" value=\"req_medal\">\n                                        Medals\n                                    </option>\n                                    <option id=\"req_crown\" value=\"req_crown\">\n                                        Crowns\n                                    </option>\n                                    <option id=\"req_fairy\" value=\"req_fairy\">\n                                        Fairies\n                                    </option>\n                                    <option id=\"req_rainbowcoin\" value=\"req_rainbowcoin\">\n                                        Rainbow Coins\n                                    </option>\n                                    <option id=\"req_bean\" value=\"req_bean\">\n                                        Bean\n                                    </option>\n                                    <option id=\"req_pearl\" value=\"req_pearl\">\n                                        Pearls\n                                    </option>\n                                </select>\n                                <input min=\"0\"\n                                        max=\"201\"\n                                        name=\"win_condition_count\"\n                                        id=\"win_condition_count\"\n                                        display_name=\"Win Condition Item Count\"\n                                        class=\"form-control center-div\"\n                                        type=\"number\"\n                                        data-toggle=\"tooltip\"\n                                        title=\"Amount of the item specified to beat the game.\"\n                                        default=\"1\"\n                                        placeholder=\"1\"/>\n                            </div>\n                        </div>\n                        <div class=\"item-select\">\n                            <p class=\"select-title\">Free Trade Agreement</p>\n                            <select name=\"free_trade_setting\"\n                                    id=\"free_trade_setting\"\n                                    class=\"form-select\"\n                                    aria-label=\"Randomization type\"\n                                    display_name=\"Free Trade Agreement\"\n                                    data-toggle=\"tooltip\"\n                                    title=\"Allow Kongs to pick up items assigned to other kongs.&#10;-None: Kongs must pick up items assigned to them.&#10;-Major Collectibles except Blueprints: Keys, Crowns, and GBs can be picked up by any Kong.&#10;-Major Collectibles: Same as above plus Blueprints.\">\n                                <option id=\"none\" selected value=\"none\">\n                                    None\n                                </option>\n                                <option id=\"not_blueprints\" value=\"not_blueprints\">\n                                    Major Collectibles except Blueprints\n                                </option>\n                                <option id=\"major_collectibles\" value=\"major_collectibles\">\n                                    Major Collectibles\n                                </option>\n                            </select>\n                        </div>\n                        <div class=\"item-select\">\n                            <p class=\"select-title\">Activate Bananaports</p>\n                            <select name=\"activate_all_bananaports\"\n                                    id=\"activate_all_bananaports\"\n                                    class=\"form-select\"\n                                    aria-label=\"Activate Bananaports\"\n                                    display_name=\"Activate Bananaports\"\n                                    data-toggle=\"tooltip\"\n                                    title=\"Determines which (if any) bananaports are activated by default.&#10;-Off: Bananaports are off by default.&#10;-Isles Only: Only the Bananaports in Isles are on by default.&#10;-All: All Bananaports are on by default.\">\n                                <option selected id=\"off\" value=\"off\">\n                                    Off\n                                </option>\n                                <option id=\"isles\" value=\"isles\">\n                                    Isles Only\n                                </option>\n                                <option id=\"all\" value=\"all\">\n                                    All\n                                </option>\n                            </select>\n                        </div>\n                        <div class=\"item-select\">\n                            <p class=\"select-title\">Fungi Time</p>\n                            <select name=\"fungi_time\"\n                                    id=\"fungi_time\"\n                                    class=\"form-select center-div\"\n                                    aria-label=\"Fungi Time\"\n                                    display_name=\"Fungi Time\"\n                                    data-toggle=\"tooltip\"\n                                    title=\"Alter the time of day in Fungi.\">\n                                <option selected id=\"day\" value=\"day\">Daytime Start</option>\n                                <option id=\"night\" value=\"night\">Nighttime Start</option>\n                                <option id=\"random\" value=\"random\">Random Start</option>\n                                <option id=\"dusk\" value=\"dusk\" title=\"All time-specific gates are closed.\">Dusk</option>\n                                <option id=\"progressive\" value=\"progressive\" title=\"Time of day progressively changes.\">Progressive</option>\n                            </select>\n                        </div>\n                        <div class=\"item-select\">\n                            <p class=\"select-title\">Galleon Water</p>\n                            <select name=\"galleon_water\"\n                                    id=\"galleon_water\"\n                                    display_name=\"Galleon Water\"\n                                    class=\"form-select center-div\"\n                                    aria-label=\"Galleon Water\"\n                                    data-toggle=\"tooltip\"\n                                    title=\"Alter the water level in Galleon.\">\n                                <option selected id=\"lowered\" value=\"lowered\">Lowered</option>\n                                <option id=\"raised\" value=\"raised\">Raised</option>\n                                <option id=\"random\" value=\"random\">Random</option>\n                            </select>\n                        </div>\n                    </div>\n                    <h2 class=\"title\">KONG MODELS</h2>\n                    <div class=\"flex-container\">\n                        ";
var t_6;
t_6 = ["DK","Diddy","Lanky","Tiny","Chunky"];
frame.set("kong_lst", t_6, true);
if(frame.topLevel) {
context.setVariable("kong_lst", t_6);
}
if(frame.topLevel) {
context.addExport("kong_lst", t_6);
}
output += "\n                        ";
frame = frame.push();
var t_9 = runtime.contextOrFrameLookup(context, frame, "kong_lst");
if(t_9) {t_9 = runtime.fromIterator(t_9);
var t_8 = t_9.length;
for(var t_7=0; t_7 < t_9.length; t_7++) {
var t_10 = t_9[t_7];
frame.set("kong", t_10);
frame.set("loop.index", t_7 + 1);
frame.set("loop.index0", t_7);
frame.set("loop.revindex", t_8 - t_7);
frame.set("loop.revindex0", t_8 - t_7 - 1);
frame.set("loop.first", t_7 === 0);
frame.set("loop.last", t_7 === t_8 - 1);
frame.set("loop.length", t_8);
output += "\n                            <div class=\"item-select\">   \n                                <p class=\"select-title\">";
output += runtime.suppressValue(t_10, env.opts.autoescape);
output += "</p>\n                                <select name=\"kong_model_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_10), env.opts.autoescape);
output += "\"\n                                        id=\"kong_model_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_10), env.opts.autoescape);
output += "\"\n                                        display_name=\"Kong Model - ";
output += runtime.suppressValue(t_10, env.opts.autoescape);
output += "\"\n                                        class=\"form-select\"\n                                        aria-label=\"";
output += runtime.suppressValue(t_10, env.opts.autoescape);
output += "\">\n                                    <option selected value=\"default\">\n                                        Default\n                                    </option>\n                                    <option value=\"krusha\">\n                                        Krusha\n                                    </option>\n                                    ";
output += "\n                                </select>\n                            </div>\n                        ";
;
}
}
frame = frame.pop();
output += "\n                    </div>\n                </div>\n                <div class=\"col border panel\">\n            <h2 class=\"title\">DIFFICULTY</h2>\n            <div class = \"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Tag Barrels, Boss Fights, Candy Upgrades etc don't heal you like they normally would.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"no_healing\"\n                               display_name=\"No Heals\"\n                               value=\"True\"/>\n                        No Heals\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\" title=\"No melons are dropped from enemies.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"no_melons\"\n                               display_name=\"No Melon Slice Drops\"\n                               value=\"True\"/>\n                        No Melon Slice Drops\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Ice Traps damage you.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"ice_traps_damage\"\n                               id=\"ice_traps_damage\"\n                               display_name=\"Ice Traps Damage Player\"\n                               value=\"True\"/>\n                        Ice Traps Damage Player\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"The game is horizontally mirrored.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"mirror_mode\"\n                               id=\"mirror_mode\"\n                               display_name=\"Mirror Mode\"\n                               value=\"True\"/>\n                        Mirror Mode\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Enabling this setting means logic may expect you to do some difficult shooting challenges without help. If this setting is disabled, then the following requirements exist:&#10;* Lanky's attic in Fungi Forest requires homing ammo.&#10;* Donkey's 5 door cabin in Crystal Caves requires homing ammo.&#10;* Tiny's trash can in Creepy Castle requires homing ammo. (This can be bypassed with Saxophone)&#10;* Chunky's tree banana in Creepy Castle requires sniper scope. (This requirement can be skipped by shooting from below the switch.)&#10;* Chunky's shooting barrel in Hideout Helm requires either sniper scope or homing ammo.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"hard_shooting\"\n                               display_name=\"Hard Shooting\"\n                               value=\"True\"/>\n                        Hard Shooting\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"This option enables various harder gameplay features.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"hard_mode\"\n                               id=\"hard_mode\"\n                               display_name=\"Hard Mode\"\n                               value=\"True\"/>\n                        Hard Mode\n                    </label>\n                    ";
output += runtime.suppressValue((lineno = 380, colno = 36, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "hard_mode"),"hard_mode","HARD MODE","This will open a popup that will let you customize what hard mode Options are active.",10])), env.opts.autoescape);
output += "\n                    ";
output += "\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"This option enables various harder challenges for boss fights.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"hard_bosses\"\n                               id=\"hard_bosses\"\n                               display_name=\"Hard Bosses\"\n                               value=\"True\"/>\n                        Hard Bosses\n                    </label>\n                    ";
output += runtime.suppressValue((lineno = 393, colno = 36, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "hard_bosses"),"hard_bosses","HARD BOSSES","This will open a popup that will let you customize what bosses are made harder.",10])), env.opts.autoescape);
output += "\n                    ";
output += "\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"When a kong dies you can no longer use the kong excluding for boss fights, you can enter any boss arena with any kong and it will force you to the required kong, if a kong is dead all moves will be granted.&#10;WARNING: Seeds might become unbeatable.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"perma_death\"\n                               display_name=\"Irondonk\"\n                               value=\"True\"/>\n                        Irondonk\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Disables tag barrels from spawning.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"disable_tag_barrels\"\n                               id=\"disable_tag_barrels\"\n                               display_name=\"Tag Barrels Disabled\"\n                               value=\"True\"/>\n                        Tag Barrels Disabled\n                    </label>\n                </div>\n                <div class=\"spacer\"></div>\n            </div>\n            <div class = \"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Damage</p>\n                    <select name=\"damage_amount\"\n                            id=\"damage_amount\"\n                            display_name=\"Damage Multiplier\"\n                            class=\"form-select center-div\"\n                            aria-label=\"Damage Options\">\n                        <option selected value=\"default\">\n                            Normal\n                        </option>\n                        <option value=\"ohko\">\n                            OHKO\n                        </option>\n                        <option value=\"double\">\n                            Double Damage\n                        </option>\n                        <option value=\"quad\">\n                            Quad Damage\n                        </option>\n                    </select>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Crown Enemies</p>\n                    <select name=\"crown_enemy_difficulty\"\n                            id=\"crown_enemy_difficulty\"\n                            display_name=\"Crown Enemy Randomizer\"\n                            class=\"form-select\"\n                            aria-label=\"Crown Enemy Randomizer\"\n                            data-toggle=\"tooltip\"\n                            title=\"Battle Crown Enemies are Randomized.&#10;-Vanilla: No crown enemy randomization will take place.&#10;-Easy: Crown enemies are randomized with a bias towards the easier enemies.&#10;-Medium: Crown enemies are randomized with a bias towards the medium-difficulty enemies.&#10;-Hard: Crown enemies are randomized with a bias towards the hardest enemies.\">\n                        <option selected id=\"vanilla\" value=\"vanilla\">\n                            Vanilla\n                        </option>\n                        <option id=\"easy\" value=\"easy\">\n                            Easy\n                        </option>\n                        <option id=\"medium\" value=\"medium\">\n                            Medium\n                        </option>\n                        <option id=\"hard\" value=\"hard\">\n                            Hard\n                        </option>\n                        <option id=\"progressive\" value=\"progressive\" title=\"The difficulty of crowns will scale up as you progress through the game.\">\n                            Progressive Difficulty\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n    <script>\n        $(function() {\n            $('[data-toggle=\"tooltip\"]').tooltip()\n        })\n    </script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["plandomizer/plandomizer.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<style>\n    .plando-pane {\n        padding-bottom: 24px;\n    }\n\n    .plando-pills {\n        padding: 24px 0;\n    }\n\n    .plando-pill {\n        flex: 0 0 16%;\n    }\n</style>\n";
output += "\n";
output += "\n";
output += "\n";
output += "\n";
output += "\n";
output += "\n";
output += "\n<div class=\"container border\" style=\"margin-top: 20px;\">\n    <!-- The import/export/reset panel. -->\n    <label for=\"settings_string\" class=\"select-title\">\n            Plandomizer JSON\n    </label>\n    <div class=\"flex-container flex-center import-export-container\">\n        <input id=\"import_plando_settings\"\n               class=\"btn btn-secondary settings-button\"\n               type=\"button\"\n               onClick=\"plando_import_filebox()\"\n               value=\"Import Settings from File\"/>\n        <input id=\"export_plando_settings\"\n               class=\"btn btn-secondary settings-button\"\n               type=\"button\"\n               value=\"Export Settings to File\"/>\n        <input id=\"reset_plando_settings\"\n               class=\"btn btn-secondary settings-button\"\n               type=\"button\"\n               value=\"Reset Plando Settings\"/>\n    </div>\n    <div class=\"import-errors\"\n         id=\"plando_import_errors\"\n         style=\"display: none;\">\n    </div>\n    <div id=\"plando_string_section\" class=\"flex-container\" style=\"justify-content: center;\">\n        <div class=\"form-group item-select\" style=\"min-width:300px;\">\n            <span class=\"row settings-string-container\">\n                <input name=\"plando_string\"\n                        id=\"plando_string\"\n                        placeholder=\"Click Export or Copy Settings to fill\"/>\n                <img name=\"plando_string_copy\"\n                        id=\"plando_string_copy\"\n                        class=\"copy-icon\"\n                        data-toggle=\"tooltip\"\n                        title=\"Click to copy the plando json data string to your clipboard.\"\n                        src=\"./static/img/copy-to-clipboard.svg\">\n            </span>\n        </div>\n        <div>\n            <input id=\"export_plando_string\"\n                    class=\"btn btn-secondary plando-settings-button\"\n                    style=\"margin-top: 6px;\"\n                    type=\"button\"\n                    value=\"Export Plan String\"/>\n        </div>\n    </div>\n</div>\n<div class=\"container border\">\n    <!-- The navigation panel. -->\n    <div class=\"nav nav-pills flex-container flex-center plando-pills\" id=\"plando-nav-tab\" role=\"tablist\">\n        <button class=\"nav-link active nav-item plando-pill\"\n                id=\"nav-plando-introduction-tab\"\n                data-bs-toggle=\"tab\"\n                data-bs-target=\"#nav-plando-introduction\"\n                type=\"button\"\n                role=\"tab\"\n                aria-controls=\"nav-plando-introduction\"\n                aria-selected=\"true\">\n            <p class=\"select-title\">Introduction</p>\n        </button>\n        <button class=\"nav-link nav-item plando-pill\"\n                id=\"nav-plando-general-tab\"\n                data-bs-toggle=\"tab\"\n                data-bs-target=\"#nav-plando-general\"\n                type=\"button\"\n                role=\"tab\"\n                aria-controls=\"nav-plando-general\"\n                aria-selected=\"false\">\n            <p class=\"select-title\">General</p>\n        </button>\n        ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "plando_panels");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_1;
if(runtime.isArray(t_3)) {
var t_2 = t_3.length;
for(t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1][0];
frame.set("[object Object]", t_3[t_1][0]);
var t_5 = t_3[t_1][1];
frame.set("[object Object]", t_3[t_1][1]);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n            <button class=\"nav-link nav-item plando-pill\"\n                    id=\"nav-plando-";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "-tab\"\n                    data-bs-toggle=\"tab\"\n                    data-bs-target=\"#nav-plando-";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "\"\n                    type=\"button\"\n                    role=\"tab\"\n                    ";
if(t_4 == "Locations") {
output += "style=\"display: none;\"";
;
}
output += "\n                    aria-controls=\"nav-plando-";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "\"\n                    aria-selected=\"false\">\n                <p class=\"select-title\">";
output += runtime.suppressValue(runtime.memberLookup((t_5),"name"), env.opts.autoescape);
output += "</p>\n            </button>\n        ";
;
}
} else {
t_1 = -1;
var t_2 = runtime.keys(t_3).length;
for(var t_6 in t_3) {
t_1++;
var t_7 = t_3[t_6];
frame.set("panelName", t_6);
frame.set("panel", t_7);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n            <button class=\"nav-link nav-item plando-pill\"\n                    id=\"nav-plando-";
output += runtime.suppressValue(t_6, env.opts.autoescape);
output += "-tab\"\n                    data-bs-toggle=\"tab\"\n                    data-bs-target=\"#nav-plando-";
output += runtime.suppressValue(t_6, env.opts.autoescape);
output += "\"\n                    type=\"button\"\n                    role=\"tab\"\n                    ";
if(t_6 == "Locations") {
output += "style=\"display: none;\"";
;
}
output += "\n                    aria-controls=\"nav-plando-";
output += runtime.suppressValue(t_6, env.opts.autoescape);
output += "\"\n                    aria-selected=\"false\">\n                <p class=\"select-title\">";
output += runtime.suppressValue(runtime.memberLookup((t_7),"name"), env.opts.autoescape);
output += "</p>\n            </button>\n        ";
;
}
}
}
frame = frame.pop();
output += "\n    </div>\n</div>\n<div class=\"container border\">\n    ";
output += "\n    <div class=\"tab-content\" id=\"nav-tabContent\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer_introduction.html", false, "plandomizer/plandomizer.html", false, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
callback(null,t_8);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_11,t_10) {
if(t_11) { cb(t_11); return; }
callback(null,t_10);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer_general.html", false, "plandomizer/plandomizer.html", false, function(t_13,t_12) {
if(t_13) { cb(t_13); return; }
callback(null,t_12);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_15,t_14) {
if(t_15) { cb(t_15); return; }
callback(null,t_14);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n        ";
frame = frame.push();
var t_18 = runtime.contextOrFrameLookup(context, frame, "plando_panels");
if(t_18) {t_18 = runtime.fromIterator(t_18);
var t_16;
if(runtime.isArray(t_18)) {
var t_17 = t_18.length;
for(t_16=0; t_16 < t_18.length; t_16++) {
var t_19 = t_18[t_16][0];
frame.set("[object Object]", t_18[t_16][0]);
var t_20 = t_18[t_16][1];
frame.set("[object Object]", t_18[t_16][1]);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
output += "\n            ";
if(t_19 == "Shops") {
output += "\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer_shops.html", false, "plandomizer/plandomizer.html", false, function(t_22,t_21) {
if(t_22) { cb(t_22); return; }
callback(null,t_21);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_24,t_23) {
if(t_24) { cb(t_24); return; }
callback(null,t_23);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n            ";
});
}
else {
if(t_19 == "Switches") {
output += "\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer_switches.html", false, "plandomizer/plandomizer.html", false, function(t_26,t_25) {
if(t_26) { cb(t_26); return; }
callback(null,t_25);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_28,t_27) {
if(t_28) { cb(t_28); return; }
callback(null,t_27);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n            ";
});
}
else {
if(t_19 == "Locations") {
output += "\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer_locations.html", false, "plandomizer/plandomizer.html", false, function(t_30,t_29) {
if(t_30) { cb(t_30); return; }
callback(null,t_29);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_32,t_31) {
if(t_32) { cb(t_32); return; }
callback(null,t_31);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n            ";
});
}
else {
if(t_19 == "Minigames") {
output += "\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer_minigames.html", false, "plandomizer/plandomizer.html", false, function(t_34,t_33) {
if(t_34) { cb(t_34); return; }
callback(null,t_33);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_36,t_35) {
if(t_36) { cb(t_36); return; }
callback(null,t_35);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n            ";
});
}
else {
if(t_19 == "Hints") {
output += "\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer_hints.html", false, "plandomizer/plandomizer.html", false, function(t_38,t_37) {
if(t_38) { cb(t_38); return; }
callback(null,t_37);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_40,t_39) {
if(t_40) { cb(t_40); return; }
callback(null,t_39);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n            ";
});
}
else {
output += "\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer_levels.html", false, "plandomizer/plandomizer.html", false, function(t_42,t_41) {
if(t_42) { cb(t_42); return; }
callback(null,t_41);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_44,t_43) {
if(t_44) { cb(t_44); return; }
callback(null,t_43);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n            ";
});
}
;
}
;
}
;
}
;
}
output += "\n        ";
;
}
} else {
t_16 = -1;
var t_17 = runtime.keys(t_18).length;
for(var t_45 in t_18) {
t_16++;
var t_46 = t_18[t_45];
frame.set("panelName", t_45);
frame.set("panel", t_46);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
output += "\n            ";
if(t_45 == "Shops") {
output += "\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer_shops.html", false, "plandomizer/plandomizer.html", false, function(t_48,t_47) {
if(t_48) { cb(t_48); return; }
callback(null,t_47);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_50,t_49) {
if(t_50) { cb(t_50); return; }
callback(null,t_49);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n            ";
});
}
else {
if(t_45 == "Switches") {
output += "\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer_switches.html", false, "plandomizer/plandomizer.html", false, function(t_52,t_51) {
if(t_52) { cb(t_52); return; }
callback(null,t_51);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_54,t_53) {
if(t_54) { cb(t_54); return; }
callback(null,t_53);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n            ";
});
}
else {
if(t_45 == "Locations") {
output += "\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer_locations.html", false, "plandomizer/plandomizer.html", false, function(t_56,t_55) {
if(t_56) { cb(t_56); return; }
callback(null,t_55);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_58,t_57) {
if(t_58) { cb(t_58); return; }
callback(null,t_57);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n            ";
});
}
else {
if(t_45 == "Minigames") {
output += "\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer_minigames.html", false, "plandomizer/plandomizer.html", false, function(t_60,t_59) {
if(t_60) { cb(t_60); return; }
callback(null,t_59);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_62,t_61) {
if(t_62) { cb(t_62); return; }
callback(null,t_61);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n            ";
});
}
else {
if(t_45 == "Hints") {
output += "\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer_hints.html", false, "plandomizer/plandomizer.html", false, function(t_64,t_63) {
if(t_64) { cb(t_64); return; }
callback(null,t_63);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_66,t_65) {
if(t_66) { cb(t_66); return; }
callback(null,t_65);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n            ";
});
}
else {
output += "\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer_levels.html", false, "plandomizer/plandomizer.html", false, function(t_68,t_67) {
if(t_68) { cb(t_68); return; }
callback(null,t_67);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_70,t_69) {
if(t_70) { cb(t_70); return; }
callback(null,t_69);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n            ";
});
}
;
}
;
}
;
}
;
}
output += "\n        ";
;
}
}
}
frame = frame.pop();
output += "\n    </div>\n</div>\n<script>\n    $(function() {\n        $('[data-toggle=\"tooltip\"]').tooltip({\n            trigger: 'hover'\n        })\n    })\n    $(\"#plando_string_copy\").on('click', function (event) {\n        var input = $(\"#plando_string\");\n        input.select();\n        navigator.clipboard.writeText(input.val());\n    })\n</script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["plandomizer/plandomizer_general.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<style>\n    .item-select.wide-select,\n    .item-multiselect.wide-select {\n        max-width: 400px;\n    }\n\n    .disabled-select {\n        opacity: 0.3;\n    }\n\n    .select-order {\n        align-items: center;\n        justify-content: flex-start;\n        margin-bottom: 8px;\n    }\n\n    .order-label {\n        width: 70px;\n    }\n\n    .order-select {\n        width: auto;\n    }\n\n    .rescue-label {\n        width: 170px;\n        text-align: right;\n    }\n</style>\n<div class=\"tab-pane fade\"\n     id=\"nav-plando-general\"\n     role=\"tabpanel\"\n     aria-labelled-by=\"nav-plando-general-tab\">\n    <div class=\"row\">\n        <div class=\"col panel\"\n             style=\"border-right: 1px solid #e3e3e3;\">\n            <h2 class=\"title\">World</h2>\n            ";
output += "\n            <div class=\"item-select wide-select\">\n                <p class=\"select-title\">Spawn Location</p>\n                <select name=\"plando_starting_exit\"\n                        id=\"plando_starting_exit\"\n                        class=\"form-select center-div\"\n                        aria-label=\"Spawn Location\"\n                        data-toggle=\"tooltip\"\n                        title=\"Choose the spawn location when starting the game.\">\n                    <option selected value=\"\">\n                        -- Randomize --\n                    </option>\n                    ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "plando_spawns");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("spawn", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n                        <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"value"), env.opts.autoescape);
output += "\">\n                            ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += "\n                        </option>\n                    ";
;
}
}
frame = frame.pop();
output += "\n                </select>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"item-multiselect wide-select\">\n                    <p class=\"select-title\">Starting Kongs</p>\n                    <div style=\"font-style: italic;\">\n                        If incompatible, what is chosen here will override your chosen starting Kong in the Progression tab!\n                    </div>\n                    <div id=\"plando_starting_kongs_selected_wrapper\"\n                         data-toggle=\"tooltip\"\n                         title>\n                        <select name=\"plando_starting_kongs_selected\"\n                                id=\"plando_starting_kongs_selected\"\n                                class=\"form-select multi-select\"\n                                aria-label=\"Starting Kongs\"\n                                multiple\n                                size=\"6\">\n                            <option selected value=\"\">\n                                Random Kong(s)\n                            </option>\n                            <option value=\"donkey\">\n                                Donkey\n                            </option>\n                            <option value=\"diddy\">\n                                Diddy\n                            </option>\n                            <option value=\"lanky\">\n                                Lanky\n                            </option>\n                            <option value=\"tiny\">\n                                Tiny\n                            </option>\n                            <option value=\"chunky\">\n                                Chunky\n                            </option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n            <div class=\"item-select wide-select\">\n                <p class=\"select-title\">Kong Cage Openers</p>\n                ";
frame = frame.push();
var t_7 = ["diddy","lanky","tiny","chunky"];
if(t_7) {t_7 = runtime.fromIterator(t_7);
var t_6 = t_7.length;
for(var t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5];
frame.set("kong", t_8);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\n                    <label id=\"plando_kong_rescue_div_";
output += runtime.suppressValue(t_8, env.opts.autoescape);
output += "\"\n                        class=\"flex-container select-order\">\n                        <span class=\"rescue-label\">";
output += runtime.suppressValue(env.getFilter("capitalize").call(context, t_8), env.opts.autoescape);
output += " cage opener:&nbsp;</span>\n                        <div id=\"plando_kong_rescue_";
output += runtime.suppressValue(t_8, env.opts.autoescape);
output += "_wrapper\"\n                             data-toggle=\"tooltip\"\n                             title>\n                            <select id=\"plando_kong_rescue_";
output += runtime.suppressValue(t_8, env.opts.autoescape);
output += "\"\n                                    name=\"plando_kong_rescue_";
output += runtime.suppressValue(t_8, env.opts.autoescape);
output += "\"\n                                    class=\"form-select order-select\">\n                                <option value=\"\" selected\">\n                                    -- Randomize --\n                                </option>\n                                ";
if(t_8 != "tiny") {
output += "\n                                    <option value=\"donkey\">\n                                        Donkey\n                                    </option>\n                                ";
;
}
output += "\n                                    <option value=\"diddy\">\n                                        Diddy\n                                    </option>\n                                ";
if(t_8 != "tiny") {
output += "\n                                    <option value=\"lanky\">\n                                        Lanky\n                                    </option>\n                                ";
;
}
output += "\n                                ";
if(t_8 != "tiny") {
output += "\n                                    <option value=\"tiny\">\n                                        Tiny\n                                    </option>\n                                ";
;
}
output += "\n                                    <option value=\"chunky\">\n                                        Chunky\n                                    </option>\n                            </select>\n                        </div>\n                    </label>\n                ";
;
}
}
frame = frame.pop();
output += "\n            </div>\n            <div style=\"font-style: italic;\">\n                More plando settings in the works!\n            </div>\n            <hr>\n            <h2 class=\"title\">Custom Locations</h2>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Allows the user to specify locations for each banana fairy.\"\n                           style=\"text-align: left\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"plando_place_fairies\"\n                               id=\"plando_place_fairies\"\n                               display_name=\"Banana Fairies\"\n                               value=\"True\"/>\n                        Banana Fairies\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Allows the user to specify locations for each battle arena.\"\n                           style=\"text-align: left\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"plando_place_arenas\"\n                               id=\"plando_place_arenas\"\n                               display_name=\"Battle Arenas\"\n                               value=\"True\"/>\n                        Battle Arenas\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Allows the user to specify locations for each dirt patch.\"\n                           style=\"text-align: left\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"plando_place_patches\"\n                               id=\"plando_place_patches\"\n                               display_name=\"Dirt Patches\"\n                               value=\"True\"/>\n                        Dirt Patches\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Allows the user to specify locations for each Kasplat.\"\n                           style=\"text-align: left\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"plando_place_kasplats\"\n                               id=\"plando_place_kasplats\"\n                               display_name=\"Kasplats\"\n                               value=\"True\"/>\n                        Kasplats\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Allows the user to specify locations for each melon crate.\"\n                           style=\"text-align: left\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"plando_place_crates\"\n                               id=\"plando_place_crates\"\n                               display_name=\"Melon Crates\"\n                               value=\"True\"/>\n                        Melon Crates\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Allows the user to specify locations for each Wrinkly door.\"\n                           style=\"text-align: left\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"plando_place_wrinkly\"\n                               id=\"plando_place_wrinkly\"\n                               display_name=\"Wrinkly Doors\"\n                               value=\"True\"/>\n                        Wrinkly Doors\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Allows the user to specify locations for each Troff 'n' Scoff portal.\"\n                           style=\"text-align: left\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"plando_place_tns\"\n                               id=\"plando_place_tns\"\n                               display_name=\"Troff 'n' Scoff Portals\"\n                               value=\"True\"/>\n                        Troff 'n' Scoff Portals\n                    </label>\n                </div>\n                <div class=\"spacer\"></div>\n            </div>\n        </div>\n        <div class=\"col panel\"\n             style=\"border-left: 1px solid #e3e3e3;\">\n            <h2 class=\"title\">Ordering</h2>\n            <div class=\"item-select wide-select\">\n                <p class=\"select-title\">Level Order</p>\n                <p style=\"font-style: italic;\">\n                    This planned level order is ignored in non-complex level order shuffle if Kongs are not in the item pool!\n                </p>\n                ";
frame = frame.push();
var t_11 = (lineno = 254, colno = 33, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [0,8]));
if(t_11) {t_11 = runtime.fromIterator(t_11);
var t_10 = t_11.length;
for(var t_9=0; t_9 < t_11.length; t_9++) {
var t_12 = t_11[t_9];
frame.set("i", t_12);
frame.set("loop.index", t_9 + 1);
frame.set("loop.index0", t_9);
frame.set("loop.revindex", t_10 - t_9);
frame.set("loop.revindex0", t_10 - t_9 - 1);
frame.set("loop.first", t_9 === 0);
frame.set("loop.last", t_9 === t_10 - 1);
frame.set("loop.length", t_10);
output += "\n                    <label id=\"plando_level_order_div_";
output += runtime.suppressValue(t_12, env.opts.autoescape);
output += "\"\n                        class=\"flex-container select-order\">\n                        <span class=\"order-label\">Level ";
output += runtime.suppressValue(t_12 + 1, env.opts.autoescape);
output += ":</span>\n                        <div id=\"plando_level_order_";
output += runtime.suppressValue(t_12, env.opts.autoescape);
output += "_wrapper\"\n                             data-toggle=\"tooltip\"\n                             title>\n                            <select id=\"plando_level_order_";
output += runtime.suppressValue(t_12, env.opts.autoescape);
output += "\"\n                                    name=\"plando_level_order_";
output += runtime.suppressValue(t_12, env.opts.autoescape);
output += "\"\n                                    class=\"form-select order-select\">\n                                <option value=\"\" selected\">\n                                    -- Randomize --\n                                </option>\n                                <option value=\"JungleJapes\">\n                                    Jungle Japes\n                                </option>\n                                <option value=\"AngryAztec\">\n                                    Angry Aztec\n                                </option>\n                                <option value=\"FranticFactory\">\n                                    Frantic Factory\n                                </option>\n                                <option value=\"GloomyGalleon\">\n                                    Gloomy Galleon\n                                </option>\n                                <option value=\"FungiForest\">\n                                    Fungi Forest\n                                </option>\n                                <option value=\"CrystalCaves\">\n                                    Crystal Caves\n                                </option>\n                                <option value=\"CreepyCastle\">\n                                    Creepy Castle\n                                </option>\n                                <option value=\"HideoutHelm\">\n                                    Hideout Helm\n                                </option>\n                            </select>\n                        </div>\n                    </label>\n                ";
;
}
}
frame = frame.pop();
output += "\n            </div>\n            <div class=\"item-select wide-select\">\n                <p class=\"select-title\">K. Rool Order</p>\n                ";
frame = frame.push();
var t_15 = (lineno = 298, colno = 33, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [0,5]));
if(t_15) {t_15 = runtime.fromIterator(t_15);
var t_14 = t_15.length;
for(var t_13=0; t_13 < t_15.length; t_13++) {
var t_16 = t_15[t_13];
frame.set("i", t_16);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
output += "\n                    <label id=\"plando_krool_order_div_";
output += runtime.suppressValue(t_16, env.opts.autoescape);
output += "\"\n                        class=\"flex-container select-order\">\n                        <span class=\"order-label\">Phase ";
output += runtime.suppressValue(t_16 + 1, env.opts.autoescape);
output += ":</span>\n                        <div id=\"plando_krool_order_";
output += runtime.suppressValue(t_16, env.opts.autoescape);
output += "_wrapper\"\n                             data-toggle=\"tooltip\"\n                             title>\n                            <select id=\"plando_krool_order_";
output += runtime.suppressValue(t_16, env.opts.autoescape);
output += "\"\n                                    name=\"plando_krool_order_";
output += runtime.suppressValue(t_16, env.opts.autoescape);
output += "\"\n                                    class=\"form-select order-select\">\n                                <option value=\"\" selected\">\n                                    -- Randomize --\n                                </option>\n                                ";
frame = frame.push();
var t_19 = runtime.contextOrFrameLookup(context, frame, "plando_phases");
if(t_19) {t_19 = runtime.fromIterator(t_19);
var t_18 = t_19.length;
for(var t_17=0; t_17 < t_19.length; t_17++) {
var t_20 = t_19[t_17];
frame.set("phase", t_20);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
output += "\n                                  <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_20),"value"), env.opts.autoescape);
output += "\"\n                                  ";
if(runtime.inOperator("Boss",runtime.memberLookup((t_20),"value"))) {
output += "\n                                    class=\"plando-tns-boss\"\n                                  ";
;
}
else {
output += "\n                                    class=\"plando-krool-phase\"\n                                  ";
;
}
output += "\n                                  >\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_20),"name"), env.opts.autoescape);
output += "\n                                  </option>\n                                ";
;
}
}
frame = frame.pop();
output += "\n                            </select>\n                        </div>\n                    </label>\n                ";
;
}
}
frame = frame.pop();
output += "\n            </div>\n            <div class=\"item-select wide-select\">\n                <p class=\"select-title\">Boss Order</p>\n                <p style=\"font-style: italic;\">\n                    If you plando any T&S bosses, the SLO requirement to be able to beat bosses by or before each level may be violated. Keep this in mind when placing other items. You must choose a boss in order to choose a Kong.\n                </p>\n                ";
frame = frame.push();
var t_23 = (lineno = 332, colno = 33, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [0,7]));
if(t_23) {t_23 = runtime.fromIterator(t_23);
var t_22 = t_23.length;
for(var t_21=0; t_21 < t_23.length; t_21++) {
var t_24 = t_23[t_21];
frame.set("i", t_24);
frame.set("loop.index", t_21 + 1);
frame.set("loop.index0", t_21);
frame.set("loop.revindex", t_22 - t_21);
frame.set("loop.revindex0", t_22 - t_21 - 1);
frame.set("loop.first", t_21 === 0);
frame.set("loop.last", t_21 === t_22 - 1);
frame.set("loop.length", t_22);
output += "\n                    <label id=\"plando_boss_order_div_";
output += runtime.suppressValue(t_24, env.opts.autoescape);
output += "\"\n                        class=\"flex-container select-order\">\n                        <span class=\"order-label\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "cb_rando_levels")),t_24)),"name"), env.opts.autoescape);
output += ":</span>\n                        <div id=\"plando_boss_order_";
output += runtime.suppressValue(t_24, env.opts.autoescape);
output += "_wrapper\"\n                             data-toggle=\"tooltip\"\n                             title>\n                            <select id=\"plando_boss_order_";
output += runtime.suppressValue(t_24, env.opts.autoescape);
output += "\"\n                                    name=\"plando_boss_order_";
output += runtime.suppressValue(t_24, env.opts.autoescape);
output += "\"\n                                    class=\"form-select order-select\">\n                                <option value=\"\" selected\">\n                                    -- Randomize --\n                                </option>\n                                ";
frame = frame.push();
var t_27 = runtime.contextOrFrameLookup(context, frame, "plando_phases");
if(t_27) {t_27 = runtime.fromIterator(t_27);
var t_26 = t_27.length;
for(var t_25=0; t_25 < t_27.length; t_25++) {
var t_28 = t_27[t_25];
frame.set("phase", t_28);
frame.set("loop.index", t_25 + 1);
frame.set("loop.index0", t_25);
frame.set("loop.revindex", t_26 - t_25);
frame.set("loop.revindex0", t_26 - t_25 - 1);
frame.set("loop.first", t_25 === 0);
frame.set("loop.last", t_25 === t_26 - 1);
frame.set("loop.length", t_26);
output += "\n                                  <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_28),"value"), env.opts.autoescape);
output += "\"\n                                  ";
if(runtime.inOperator("Boss",runtime.memberLookup((t_28),"value"))) {
output += "\n                                    class=\"plando-krool-phase\"\n                                  ";
;
}
else {
output += "\n                                    class=\"plando-tns-boss\"\n                                  ";
;
}
output += "\n                                  >\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_28),"name"), env.opts.autoescape);
output += "\n                                  </option>\n                                ";
;
}
}
frame = frame.pop();
output += "\n                            </select>\n                        </div>\n                        <div id=\"plando_boss_kong_";
output += runtime.suppressValue(t_24, env.opts.autoescape);
output += "_wrapper\"\n                             data-toggle=\"tooltip\"\n                             title>\n                            <select id=\"plando_boss_kong_";
output += runtime.suppressValue(t_24, env.opts.autoescape);
output += "\"\n                                    name=\"plando_boss_kong_";
output += runtime.suppressValue(t_24, env.opts.autoescape);
output += "\"\n                                    class=\"form-select order-select\">\n                                <option value=\"\" selected\">\n                                    -- Randomize --\n                                </option>\n                                <option value=\"donkey\">\n                                    Donkey\n                                </option>\n                                <option value=\"diddy\">\n                                    Diddy\n                                </option>\n                                <option value=\"lanky\">\n                                    Lanky\n                                </option>\n                                <option value=\"tiny\">\n                                    Tiny\n                                </option>\n                                <option value=\"chunky\">\n                                    Chunky\n                                </option>\n                            </select>\n                        </div>\n                    </label>\n                ";
;
}
}
frame = frame.pop();
output += "\n            </div>\n            <div class=\"item-select wide-select\">\n                <p class=\"select-title\">Helm Order</p>\n                ";
frame = frame.push();
var t_31 = (lineno = 389, colno = 33, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [0,5]));
if(t_31) {t_31 = runtime.fromIterator(t_31);
var t_30 = t_31.length;
for(var t_29=0; t_29 < t_31.length; t_29++) {
var t_32 = t_31[t_29];
frame.set("i", t_32);
frame.set("loop.index", t_29 + 1);
frame.set("loop.index0", t_29);
frame.set("loop.revindex", t_30 - t_29);
frame.set("loop.revindex0", t_30 - t_29 - 1);
frame.set("loop.first", t_29 === 0);
frame.set("loop.last", t_29 === t_30 - 1);
frame.set("loop.length", t_30);
output += "\n                    <label id=\"plando_helm_order_div_";
output += runtime.suppressValue(t_32, env.opts.autoescape);
output += "\"\n                        class=\"flex-container select-order\">\n                        <span class=\"order-label\">Kong ";
output += runtime.suppressValue(t_32 + 1, env.opts.autoescape);
output += ":</span>\n                        <div id=\"plando_helm_order_";
output += runtime.suppressValue(t_32, env.opts.autoescape);
output += "_wrapper\"\n                             data-toggle=\"tooltip\"\n                             title>\n                            <select id=\"plando_helm_order_";
output += runtime.suppressValue(t_32, env.opts.autoescape);
output += "\"\n                                    name=\"plando_helm_order_";
output += runtime.suppressValue(t_32, env.opts.autoescape);
output += "\"\n                                    class=\"form-select order-select\">\n                                <option value=\"\" selected\">\n                                    -- Randomize --\n                                </option>\n                                <option value=\"donkey\">\n                                    Donkey\n                                </option>\n                                <option value=\"diddy\">\n                                    Diddy\n                                </option>\n                                <option value=\"lanky\">\n                                    Lanky\n                                </option>\n                                <option value=\"tiny\">\n                                    Tiny\n                                </option>\n                                <option value=\"chunky\">\n                                    Chunky\n                                </option>\n                            </select>\n                        </div>\n                    </label>\n                ";
;
}
}
frame = frame.pop();
output += "\n            </div>\n        </div>\n    </div>\n</div>\n<script>\n    $('#plando_starting_kongs_selected option').mousedown(function(e) {\n        $(this).prop('selected', !$(this).prop('selected'));\n        // For some reason, jQuery will not trigger this event properly.\n        document.getElementById('plando_starting_kongs_selected').dispatchEvent(new Event('change'));\n    \n        return false;\n    });\n</script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["plandomizer/plandomizer_hints.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n<style>\n    .hint-info {\n        margin: 16px 16px;\n    }\n\n    .color-guide-toggle {\n        cursor: pointer;\n        text-decoration: underline;\n    }\n\n    .color-table {\n        max-width: 300px;\n    }\n</style>\n<div class=\"tab-pane plando-pane fade\"\n     id=\"nav-plando-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "panelName"), env.opts.autoescape);
output += "\"\n     role=\"tabpanel\"\n     aria-labelledby=\"nav-plando-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "panelName"), env.opts.autoescape);
output += "-tab\">\n    <h2 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"name"), env.opts.autoescape);
output += "</h2>\n    <div class=\"hint-info\">\n        Hints can be a maximum of 123 characters. The only permitted characters\n        are letters, numbers, spaces, the characters ',.-?! and color tags.\n        Any blank hints will be filled by the selected hint algorithm.\n    </div>\n    <div class=\"hint-info\">\n        To apply color to hint text, surround that text with the appropriate\n        color tag. <pre>[red]This text is colored with red.[/red]</pre>\n    </div>\n    <div class=\"hint-info\">\n        There are ten colors to choose from.\n        <span class=\"color-guide-toggle\" id=\"plando_toggle_color_table\">Show/Hide Color Guide</span>\n    </div>\n    <div class=\"flex-container flex-center hidden\" id=\"plando_hint_color_table\">\n        <table class=\"color-table\">\n            <tr>\n                <th style=\"background-color: #fff; color: #000;\">Light</th>\n                <th>Dark</th>\n            </tr>\n            <tr>\n                <td style=\"background-color: #fff; color: #a36200;\">orange</td>\n                <td style=\"color: #ffa010;\">orange</td>\n            </tr>\n            <tr>\n                <td style=\"background-color: #fff; color: #b00000;\">red</td>\n                <td style=\"color: #ff0000;\">red</td>\n            </tr>\n            <tr>\n                <td style=\"background-color: #fff; color: #2828ff;\">blue</td>\n                <td style=\"color: #0c7ded;\">blue</td>\n            </tr>\n            <tr>\n                <td style=\"background-color: #fff; color: #8000ff;\">purple</td>\n                <td style=\"color: #bb1cff;\">purple</td>\n            </tr>\n            <tr>\n                <td style=\"background-color: #fff; color: #008000;\">lightgreen</td>\n                <td style=\"color: #59ff64;\">lightgreen</td>\n            </tr>\n            <tr>\n                <td style=\"background-color: #fff; color: #b00058;\">magenta</td>\n                <td style=\"color: #e84898;\">magenta</td>\n            </tr>\n            <tr>\n                <td style=\"background-color: #fff; color: #008080;\">cyan</td>\n                <td style=\"color: #3ee1e1;\">cyan</td>\n            </tr>\n            <tr>\n                <td style=\"background-color: #fff; color: #c04040;\">rust</td>\n                <td style=\"color: #d25757;\">rust</td>\n            </tr>\n            <tr>\n                <td style=\"background-color: #fff; color: #132958;\">paleblue</td>\n                <td style=\"color: #b5cdff;\">paleblue</td>\n            </tr>\n            <tr>\n                <td style=\"background-color: #fff; color: #275e1e;\">green</td>\n                <td style=\"color: #00ce0e;\">green</td>\n            </tr>\n        </table>\n    </div>\n    ";
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"levels");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_1;
if(runtime.isArray(t_3)) {
var t_2 = t_3.length;
for(t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1][0];
frame.set("[object Object]", t_3[t_1][0]);
var t_5 = t_3[t_1][1];
frame.set("[object Object]", t_3[t_1][1]);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_5),"name"), env.opts.autoescape);
output += "</h3>\n        <div class=\"flex-container flex-center\">\n            ";
frame = frame.push();
var t_8 = runtime.memberLookup((t_5),"locations");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("location", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n                <div class=\"location-picker\">\n                    <label for=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_hint\" class=\"location-label\">\n                        ";
output += runtime.suppressValue(runtime.memberLookup((t_9),"name"), env.opts.autoescape);
output += "\n                    </label>\n                    <div id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_hint_wrapper\"\n                         data-toggle=\"tooltip\"\n                         title>\n                        <input type=\"text\"\n                               id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_hint\"\n                               name=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_hint\"\n                               placeholder=\"Enter hint text or leave blank for a random hint...\"\n                               maxlength=\"900\"\n                            class=\"form-control\">\n                    </div>\n                </div>\n            ";
;
}
}
frame = frame.pop();
output += "\n        </div>\n    ";
;
}
} else {
t_1 = -1;
var t_2 = runtime.keys(t_3).length;
for(var t_10 in t_3) {
t_1++;
var t_11 = t_3[t_10];
frame.set("_", t_10);
frame.set("levelObj", t_11);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += "</h3>\n        <div class=\"flex-container flex-center\">\n            ";
frame = frame.push();
var t_14 = runtime.memberLookup((t_11),"locations");
if(t_14) {t_14 = runtime.fromIterator(t_14);
var t_13 = t_14.length;
for(var t_12=0; t_12 < t_14.length; t_12++) {
var t_15 = t_14[t_12];
frame.set("location", t_15);
frame.set("loop.index", t_12 + 1);
frame.set("loop.index0", t_12);
frame.set("loop.revindex", t_13 - t_12);
frame.set("loop.revindex0", t_13 - t_12 - 1);
frame.set("loop.first", t_12 === 0);
frame.set("loop.last", t_12 === t_13 - 1);
frame.set("loop.length", t_13);
output += "\n                <div class=\"location-picker\">\n                    <label for=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_15),"value"), env.opts.autoescape);
output += "_hint\" class=\"location-label\">\n                        ";
output += runtime.suppressValue(runtime.memberLookup((t_15),"name"), env.opts.autoescape);
output += "\n                    </label>\n                    <div id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_15),"value"), env.opts.autoescape);
output += "_hint_wrapper\"\n                         data-toggle=\"tooltip\"\n                         title>\n                        <input type=\"text\"\n                               id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_15),"value"), env.opts.autoescape);
output += "_hint\"\n                               name=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_15),"value"), env.opts.autoescape);
output += "_hint\"\n                               placeholder=\"Enter hint text or leave blank for a random hint...\"\n                               maxlength=\"900\"\n                            class=\"form-control\">\n                    </div>\n                </div>\n            ";
;
}
}
frame = frame.pop();
output += "\n        </div>\n    ";
;
}
}
}
frame = frame.pop();
output += "\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["plandomizer/plandomizer_introduction.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"tab-pane plando-pane fade show active\"\n     id=\"nav-plando-introduction\"\n     role=\"tabpanel\"\n     aria-labelled-by=\"nav-plando-introduction-tab\">\n    <h2 class=\"title\">Introduction</h2>\n    <p>Welcome to the plandomizer! This is an advanced option that allows users to specify things such as\n    rewards, level order, shop costs, minigames, hints and more. All plandomizer selections will be\n    added to the other randomizer settings you have chosen.</p>\n\n    <p><b>Use with caution.</b> As you specify more rewards and options, the chances of generating an\n    impossible seed, or being unable to generate a seed at all, will increase. The easiest way to use\n    the plandomizer is to specify only a handful of items, and then let the randomizer fill in the\n    rest.</p>\n\n    <p>If your seed fails to generate, <b>do not simply try again.</b> The chances are high that there is\n    an error in your seed's logic. Ask for help in the plando-help channel on Discord instead.</p>\n\n    <p><b>Be sure to set all of your non-plandomizer settings before assigning any plandomizer settings\n    or rewards.</b> Altering some settings may change or remove assigned rewards.</p>\n\n    <p>When selecting items for locations, if an item is grayed out in any of the dropdown lists, it means\n    that the item cannot be placed in that location due to a conflict with your current settings. If an\n    item does not appear at all in a dropdown list, it means that the item cannot be placed in that\n    location due to technical limitations.</p>\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["plandomizer/plandomizer_levels.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n<div class=\"tab-pane plando-pane fade\"\n     id=\"nav-plando-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "panelName"), env.opts.autoescape);
output += "\"\n     role=\"tabpanel\"\n     aria-labelledby=\"nav-plando-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "panelName"), env.opts.autoescape);
output += "-tab\">\n    <h2 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"name"), env.opts.autoescape);
output += "</h2>\n    ";
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"locations");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_1;
if(runtime.isArray(t_3)) {
var t_2 = t_3.length;
for(t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1][0];
frame.set("[object Object]", t_3[t_1][0]);
var t_5 = t_3[t_1][1];
frame.set("[object Object]", t_3[t_1][1]);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        <h3 class=\"title\">";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "</h3>\n        <div class=\"flex-container flex-center\">\n            ";
frame = frame.push();
var t_8 = t_5;
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("location", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n                <div class=\"location-picker\">\n                    <label for=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_item\" class=\"location-label\">\n                        ";
output += runtime.suppressValue(runtime.memberLookup((t_9),"name"), env.opts.autoescape);
output += "\n                    </label>\n                    <div id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_item_wrapper\"\n                         data-toggle=\"tooltip\"\n                         title>\n                        <select id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_item\"\n                                name=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_item\"\n                                class=\"form-select plando-item-select\">\n                            <option value=\"\">-- Randomize --</option>\n                            ";
frame = frame.push();
var t_12 = env.getFilter("plando_item_restrict").call(context, runtime.contextOrFrameLookup(context, frame, "plando_items"),t_9);
if(t_12) {t_12 = runtime.fromIterator(t_12);
var t_11 = t_12.length;
for(var t_10=0; t_10 < t_12.length; t_10++) {
var t_13 = t_12[t_10];
frame.set("item", t_13);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
output += "\n                                <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_13),"value"), env.opts.autoescape);
output += "\"\n                                    ";
output += runtime.suppressValue((lineno = 23, colno = 68, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "plando_option_class_annotation"), "plando_option_class_annotation", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"name"),t_4,runtime.memberLookup((t_9),"value"),runtime.memberLookup((t_13),"value")])), env.opts.autoescape);
output += ">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_13),"name"), env.opts.autoescape);
output += "\n                                </option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        </select>\n                    </div>\n                </div>\n            ";
;
}
}
frame = frame.pop();
output += "\n        </div>\n    ";
;
}
} else {
t_1 = -1;
var t_2 = runtime.keys(t_3).length;
for(var t_14 in t_3) {
t_1++;
var t_15 = t_3[t_14];
frame.set("kong", t_14);
frame.set("locations", t_15);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        <h3 class=\"title\">";
output += runtime.suppressValue(t_14, env.opts.autoescape);
output += "</h3>\n        <div class=\"flex-container flex-center\">\n            ";
frame = frame.push();
var t_18 = t_15;
if(t_18) {t_18 = runtime.fromIterator(t_18);
var t_17 = t_18.length;
for(var t_16=0; t_16 < t_18.length; t_16++) {
var t_19 = t_18[t_16];
frame.set("location", t_19);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
output += "\n                <div class=\"location-picker\">\n                    <label for=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_item\" class=\"location-label\">\n                        ";
output += runtime.suppressValue(runtime.memberLookup((t_19),"name"), env.opts.autoescape);
output += "\n                    </label>\n                    <div id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_item_wrapper\"\n                         data-toggle=\"tooltip\"\n                         title>\n                        <select id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_item\"\n                                name=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_item\"\n                                class=\"form-select plando-item-select\">\n                            <option value=\"\">-- Randomize --</option>\n                            ";
frame = frame.push();
var t_22 = env.getFilter("plando_item_restrict").call(context, runtime.contextOrFrameLookup(context, frame, "plando_items"),t_19);
if(t_22) {t_22 = runtime.fromIterator(t_22);
var t_21 = t_22.length;
for(var t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20];
frame.set("item", t_23);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
output += "\n                                <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_23),"value"), env.opts.autoescape);
output += "\"\n                                    ";
output += runtime.suppressValue((lineno = 23, colno = 68, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "plando_option_class_annotation"), "plando_option_class_annotation", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"name"),t_14,runtime.memberLookup((t_19),"value"),runtime.memberLookup((t_23),"value")])), env.opts.autoescape);
output += ">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_23),"name"), env.opts.autoescape);
output += "\n                                </option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        </select>\n                    </div>\n                </div>\n            ";
;
}
}
frame = frame.pop();
output += "\n        </div>\n    ";
;
}
}
}
frame = frame.pop();
output += "\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["plandomizer/plandomizer_locations.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n<style>\n    .reward-label {\n        margin-top: 4px;\n    }\n</style>\n<div class=\"tab-pane plando-pane fade\"\n     id=\"nav-plando-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "panelName"), env.opts.autoescape);
output += "\"\n     role=\"tabpanel\"\n     aria-labelledby=\"nav-plando-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "panelName"), env.opts.autoescape);
output += "-tab\">\n    <h2 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"name"), env.opts.autoescape);
output += "</h2>\n    ";
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"categories");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_1;
if(runtime.isArray(t_3)) {
var t_2 = t_3.length;
for(t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1][0];
frame.set("[object Object]", t_3[t_1][0]);
var t_5 = t_3[t_1][1];
frame.set("[object Object]", t_3[t_1][1]);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        <div id=\"plando_custom_location_panel_";
output += runtime.suppressValue(env.getFilter("lower").call(context, runtime.memberLookup((t_5),"singular")), env.opts.autoescape);
output += "\"\n             style=\"display: none;\">\n            <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_5),"name"), env.opts.autoescape);
output += "</h3>\n            <div class=\"flex-container flex-center\">\n                ";
frame = frame.push();
var t_8 = runtime.memberLookup((t_5),"locations");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("location", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n                    <div class=\"location-picker\">\n                        <label for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_9),"location_id"), env.opts.autoescape);
output += "\" class=\"location-label\">\n                            ";
output += runtime.suppressValue(runtime.memberLookup((t_9),"name"), env.opts.autoescape);
output += " Location\n                        </label>\n                        <div id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_9),"location_id"), env.opts.autoescape);
output += "_wrapper\"\n                            data-toggle=\"tooltip\"\n                            title>\n                            <select id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_9),"location_id"), env.opts.autoescape);
output += "\"\n                                    name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_9),"location_id"), env.opts.autoescape);
output += "\"\n                                    class=\"form-select\">\n                                <option value=\"\"\n                                    ";
if(runtime.memberLookup((t_9),"vanilla_value") == "") {
output += "selected";
;
}
output += ">\n                                    -- Randomize --\n                                </option>\n                                ";
if(runtime.memberLookup((t_9),"none_possible")) {
output += "\n                                    <option value=\"none\"\n                                        ";
if(runtime.memberLookup((t_9),"vanilla_value") == "none") {
output += "selected";
;
}
output += ">\n                                        -- None --\n                                    </option>\n                                ";
;
}
output += "\n                                ";
if(runtime.inOperator(t_4,["CrownPad","Fairy"])) {
output += "\n                                    ";
frame = frame.push();
var t_12 = env.getFilter("plando_custom_loc_restrict").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "plando_custom_locations")),t_4)),runtime.memberLookup((t_9),"level")),runtime.memberLookup((t_9),"location_id"));
if(t_12) {t_12 = runtime.fromIterator(t_12);
var t_11 = t_12.length;
for(var t_10=0; t_10 < t_12.length; t_10++) {
var t_13 = t_12[t_10];
frame.set("selectLocation", t_13);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
output += "\n                                        <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_13),"value"), env.opts.autoescape);
output += "\"\n                                            ";
if(runtime.memberLookup((t_13),"value") == runtime.memberLookup((t_9),"vanilla_value")) {
output += "selected";
;
}
output += ">\n                                            ";
output += runtime.suppressValue(runtime.memberLookup((t_13),"name"), env.opts.autoescape);
output += "\n                                        </option>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                ";
;
}
else {
if(t_4 == "Kasplat") {
output += "\n                                    ";
frame = frame.push();
var t_16 = env.getFilter("plando_custom_loc_restrict").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "plando_custom_locations")),t_4)),runtime.memberLookup((t_9),"level"))),runtime.memberLookup((t_9),"kong")),runtime.memberLookup((t_9),"location_id"));
if(t_16) {t_16 = runtime.fromIterator(t_16);
var t_15 = t_16.length;
for(var t_14=0; t_14 < t_16.length; t_14++) {
var t_17 = t_16[t_14];
frame.set("selectLocation", t_17);
frame.set("loop.index", t_14 + 1);
frame.set("loop.index0", t_14);
frame.set("loop.revindex", t_15 - t_14);
frame.set("loop.revindex0", t_15 - t_14 - 1);
frame.set("loop.first", t_14 === 0);
frame.set("loop.last", t_14 === t_15 - 1);
frame.set("loop.length", t_15);
output += "\n                                        <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_17),"value"), env.opts.autoescape);
output += "\"\n                                            ";
if(runtime.memberLookup((t_17),"value") == runtime.memberLookup((t_9),"vanilla_value")) {
output += "selected";
;
}
output += ">\n                                            ";
output += runtime.suppressValue(runtime.memberLookup((t_17),"name"), env.opts.autoescape);
output += "\n                                        </option>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                ";
;
}
else {
if(t_4 == "WrinklyDoor") {
output += "\n                                    ";
frame = frame.push();
var t_20 = runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "plando_custom_locations")),t_4)),runtime.memberLookup((t_9),"level"))),runtime.memberLookup((t_9),"kong"));
if(t_20) {t_20 = runtime.fromIterator(t_20);
var t_19 = t_20.length;
for(var t_18=0; t_18 < t_20.length; t_18++) {
var t_21 = t_20[t_18];
frame.set("selectLocation", t_21);
frame.set("loop.index", t_18 + 1);
frame.set("loop.index0", t_18);
frame.set("loop.revindex", t_19 - t_18);
frame.set("loop.revindex0", t_19 - t_18 - 1);
frame.set("loop.first", t_18 === 0);
frame.set("loop.last", t_18 === t_19 - 1);
frame.set("loop.length", t_19);
output += "\n                                        <option value=\"";
output += runtime.suppressValue(t_21, env.opts.autoescape);
output += "\"\n                                            ";
if(t_21 == runtime.memberLookup((t_9),"vanilla_value")) {
output += "selected";
;
}
output += ">\n                                            ";
output += runtime.suppressValue(t_21, env.opts.autoescape);
output += "\n                                        </option>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                ";
;
}
else {
if(t_4 == "TnsPortal") {
output += "\n                                    ";
frame = frame.push();
var t_24 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "plando_custom_locations")),t_4)),runtime.memberLookup((t_9),"level"));
if(t_24) {t_24 = runtime.fromIterator(t_24);
var t_23 = t_24.length;
for(var t_22=0; t_22 < t_24.length; t_22++) {
var t_25 = t_24[t_22];
frame.set("selectLocation", t_25);
frame.set("loop.index", t_22 + 1);
frame.set("loop.index0", t_22);
frame.set("loop.revindex", t_23 - t_22);
frame.set("loop.revindex0", t_23 - t_22 - 1);
frame.set("loop.first", t_22 === 0);
frame.set("loop.last", t_22 === t_23 - 1);
frame.set("loop.length", t_23);
output += "\n                                        <option value=\"";
output += runtime.suppressValue(t_25, env.opts.autoescape);
output += "\"\n                                            ";
if(t_25 == runtime.memberLookup((t_9),"vanilla_value")) {
output += "selected";
;
}
output += ">\n                                            ";
output += runtime.suppressValue(t_25, env.opts.autoescape);
output += "\n                                        </option>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                ";
;
}
else {
output += "\n                                    ";
frame = frame.push();
var t_28 = env.getFilter("plando_custom_loc_restrict").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "plando_custom_locations")),t_4),runtime.memberLookup((t_9),"location_id"));
if(t_28) {t_28 = runtime.fromIterator(t_28);
var t_27 = t_28.length;
for(var t_26=0; t_26 < t_28.length; t_26++) {
var t_29 = t_28[t_26];
frame.set("selectLocation", t_29);
frame.set("loop.index", t_26 + 1);
frame.set("loop.index0", t_26);
frame.set("loop.revindex", t_27 - t_26);
frame.set("loop.revindex0", t_27 - t_26 - 1);
frame.set("loop.first", t_26 === 0);
frame.set("loop.last", t_26 === t_27 - 1);
frame.set("loop.length", t_27);
output += "\n                                        <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_29),"value"), env.opts.autoescape);
output += "\"\n                                            ";
if(runtime.memberLookup((t_29),"value") == runtime.memberLookup((t_9),"vanilla_value")) {
output += "selected";
;
}
output += ">\n                                            ";
output += runtime.suppressValue(runtime.memberLookup((t_29),"name"), env.opts.autoescape);
output += "\n                                        </option>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                ";
;
}
;
}
;
}
;
}
output += "\n                            </select>\n                        </div>\n                        ";
if(!runtime.inOperator(t_4,["WrinklyDoor","TnsPortal"])) {
output += "\n                            <label for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_9),"reward_id"), env.opts.autoescape);
output += "\" class=\"location-label reward-label\">\n                                Reward\n                            </label>\n                            <div id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_9),"reward_id"), env.opts.autoescape);
output += "_wrapper\"\n                                data-toggle=\"tooltip\"\n                                title>\n                                <select id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_9),"reward_id"), env.opts.autoescape);
output += "\"\n                                        name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_9),"reward_id"), env.opts.autoescape);
output += "\"\n                                        class=\"form-select plando-item-select\">\n                                    <option value=\"\">-- Randomize --</option>\n                                    ";
frame = frame.push();
var t_32 = env.getFilter("plando_custom_loc_item_restrict").call(context, runtime.contextOrFrameLookup(context, frame, "plando_items"),t_4);
if(t_32) {t_32 = runtime.fromIterator(t_32);
var t_31 = t_32.length;
for(var t_30=0; t_30 < t_32.length; t_30++) {
var t_33 = t_32[t_30];
frame.set("item", t_33);
frame.set("loop.index", t_30 + 1);
frame.set("loop.index0", t_30);
frame.set("loop.revindex", t_31 - t_30);
frame.set("loop.revindex0", t_31 - t_30 - 1);
frame.set("loop.first", t_30 === 0);
frame.set("loop.last", t_30 === t_31 - 1);
frame.set("loop.length", t_31);
output += "\n                                        <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_33),"value"), env.opts.autoescape);
output += "\"\n                                            ";
output += runtime.suppressValue((lineno = 88, colno = 76, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "plando_option_class_annotation"), "plando_option_class_annotation", context, ["","","",runtime.memberLookup((t_33),"value")])), env.opts.autoescape);
output += ">\n                                            ";
output += runtime.suppressValue(runtime.memberLookup((t_33),"name"), env.opts.autoescape);
output += "\n                                        </option>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                </select>\n                            </div>\n                        ";
;
}
output += "\n                    </div>\n                ";
;
}
}
frame = frame.pop();
output += "\n            </div>\n        </div>\n    ";
;
}
} else {
t_1 = -1;
var t_2 = runtime.keys(t_3).length;
for(var t_34 in t_3) {
t_1++;
var t_35 = t_3[t_34];
frame.set("categoryName", t_34);
frame.set("categoryObj", t_35);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        <div id=\"plando_custom_location_panel_";
output += runtime.suppressValue(env.getFilter("lower").call(context, runtime.memberLookup((t_35),"singular")), env.opts.autoescape);
output += "\"\n             style=\"display: none;\">\n            <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_35),"name"), env.opts.autoescape);
output += "</h3>\n            <div class=\"flex-container flex-center\">\n                ";
frame = frame.push();
var t_38 = runtime.memberLookup((t_35),"locations");
if(t_38) {t_38 = runtime.fromIterator(t_38);
var t_37 = t_38.length;
for(var t_36=0; t_36 < t_38.length; t_36++) {
var t_39 = t_38[t_36];
frame.set("location", t_39);
frame.set("loop.index", t_36 + 1);
frame.set("loop.index0", t_36);
frame.set("loop.revindex", t_37 - t_36);
frame.set("loop.revindex0", t_37 - t_36 - 1);
frame.set("loop.first", t_36 === 0);
frame.set("loop.last", t_36 === t_37 - 1);
frame.set("loop.length", t_37);
output += "\n                    <div class=\"location-picker\">\n                        <label for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_39),"location_id"), env.opts.autoescape);
output += "\" class=\"location-label\">\n                            ";
output += runtime.suppressValue(runtime.memberLookup((t_39),"name"), env.opts.autoescape);
output += " Location\n                        </label>\n                        <div id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_39),"location_id"), env.opts.autoescape);
output += "_wrapper\"\n                            data-toggle=\"tooltip\"\n                            title>\n                            <select id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_39),"location_id"), env.opts.autoescape);
output += "\"\n                                    name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_39),"location_id"), env.opts.autoescape);
output += "\"\n                                    class=\"form-select\">\n                                <option value=\"\"\n                                    ";
if(runtime.memberLookup((t_39),"vanilla_value") == "") {
output += "selected";
;
}
output += ">\n                                    -- Randomize --\n                                </option>\n                                ";
if(runtime.memberLookup((t_39),"none_possible")) {
output += "\n                                    <option value=\"none\"\n                                        ";
if(runtime.memberLookup((t_39),"vanilla_value") == "none") {
output += "selected";
;
}
output += ">\n                                        -- None --\n                                    </option>\n                                ";
;
}
output += "\n                                ";
if(runtime.inOperator(t_34,["CrownPad","Fairy"])) {
output += "\n                                    ";
frame = frame.push();
var t_42 = env.getFilter("plando_custom_loc_restrict").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "plando_custom_locations")),t_34)),runtime.memberLookup((t_39),"level")),runtime.memberLookup((t_39),"location_id"));
if(t_42) {t_42 = runtime.fromIterator(t_42);
var t_41 = t_42.length;
for(var t_40=0; t_40 < t_42.length; t_40++) {
var t_43 = t_42[t_40];
frame.set("selectLocation", t_43);
frame.set("loop.index", t_40 + 1);
frame.set("loop.index0", t_40);
frame.set("loop.revindex", t_41 - t_40);
frame.set("loop.revindex0", t_41 - t_40 - 1);
frame.set("loop.first", t_40 === 0);
frame.set("loop.last", t_40 === t_41 - 1);
frame.set("loop.length", t_41);
output += "\n                                        <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_43),"value"), env.opts.autoescape);
output += "\"\n                                            ";
if(runtime.memberLookup((t_43),"value") == runtime.memberLookup((t_39),"vanilla_value")) {
output += "selected";
;
}
output += ">\n                                            ";
output += runtime.suppressValue(runtime.memberLookup((t_43),"name"), env.opts.autoescape);
output += "\n                                        </option>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                ";
;
}
else {
if(t_34 == "Kasplat") {
output += "\n                                    ";
frame = frame.push();
var t_46 = env.getFilter("plando_custom_loc_restrict").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "plando_custom_locations")),t_34)),runtime.memberLookup((t_39),"level"))),runtime.memberLookup((t_39),"kong")),runtime.memberLookup((t_39),"location_id"));
if(t_46) {t_46 = runtime.fromIterator(t_46);
var t_45 = t_46.length;
for(var t_44=0; t_44 < t_46.length; t_44++) {
var t_47 = t_46[t_44];
frame.set("selectLocation", t_47);
frame.set("loop.index", t_44 + 1);
frame.set("loop.index0", t_44);
frame.set("loop.revindex", t_45 - t_44);
frame.set("loop.revindex0", t_45 - t_44 - 1);
frame.set("loop.first", t_44 === 0);
frame.set("loop.last", t_44 === t_45 - 1);
frame.set("loop.length", t_45);
output += "\n                                        <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_47),"value"), env.opts.autoescape);
output += "\"\n                                            ";
if(runtime.memberLookup((t_47),"value") == runtime.memberLookup((t_39),"vanilla_value")) {
output += "selected";
;
}
output += ">\n                                            ";
output += runtime.suppressValue(runtime.memberLookup((t_47),"name"), env.opts.autoescape);
output += "\n                                        </option>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                ";
;
}
else {
if(t_34 == "WrinklyDoor") {
output += "\n                                    ";
frame = frame.push();
var t_50 = runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "plando_custom_locations")),t_34)),runtime.memberLookup((t_39),"level"))),runtime.memberLookup((t_39),"kong"));
if(t_50) {t_50 = runtime.fromIterator(t_50);
var t_49 = t_50.length;
for(var t_48=0; t_48 < t_50.length; t_48++) {
var t_51 = t_50[t_48];
frame.set("selectLocation", t_51);
frame.set("loop.index", t_48 + 1);
frame.set("loop.index0", t_48);
frame.set("loop.revindex", t_49 - t_48);
frame.set("loop.revindex0", t_49 - t_48 - 1);
frame.set("loop.first", t_48 === 0);
frame.set("loop.last", t_48 === t_49 - 1);
frame.set("loop.length", t_49);
output += "\n                                        <option value=\"";
output += runtime.suppressValue(t_51, env.opts.autoescape);
output += "\"\n                                            ";
if(t_51 == runtime.memberLookup((t_39),"vanilla_value")) {
output += "selected";
;
}
output += ">\n                                            ";
output += runtime.suppressValue(t_51, env.opts.autoescape);
output += "\n                                        </option>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                ";
;
}
else {
if(t_34 == "TnsPortal") {
output += "\n                                    ";
frame = frame.push();
var t_54 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "plando_custom_locations")),t_34)),runtime.memberLookup((t_39),"level"));
if(t_54) {t_54 = runtime.fromIterator(t_54);
var t_53 = t_54.length;
for(var t_52=0; t_52 < t_54.length; t_52++) {
var t_55 = t_54[t_52];
frame.set("selectLocation", t_55);
frame.set("loop.index", t_52 + 1);
frame.set("loop.index0", t_52);
frame.set("loop.revindex", t_53 - t_52);
frame.set("loop.revindex0", t_53 - t_52 - 1);
frame.set("loop.first", t_52 === 0);
frame.set("loop.last", t_52 === t_53 - 1);
frame.set("loop.length", t_53);
output += "\n                                        <option value=\"";
output += runtime.suppressValue(t_55, env.opts.autoescape);
output += "\"\n                                            ";
if(t_55 == runtime.memberLookup((t_39),"vanilla_value")) {
output += "selected";
;
}
output += ">\n                                            ";
output += runtime.suppressValue(t_55, env.opts.autoescape);
output += "\n                                        </option>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                ";
;
}
else {
output += "\n                                    ";
frame = frame.push();
var t_58 = env.getFilter("plando_custom_loc_restrict").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "plando_custom_locations")),t_34),runtime.memberLookup((t_39),"location_id"));
if(t_58) {t_58 = runtime.fromIterator(t_58);
var t_57 = t_58.length;
for(var t_56=0; t_56 < t_58.length; t_56++) {
var t_59 = t_58[t_56];
frame.set("selectLocation", t_59);
frame.set("loop.index", t_56 + 1);
frame.set("loop.index0", t_56);
frame.set("loop.revindex", t_57 - t_56);
frame.set("loop.revindex0", t_57 - t_56 - 1);
frame.set("loop.first", t_56 === 0);
frame.set("loop.last", t_56 === t_57 - 1);
frame.set("loop.length", t_57);
output += "\n                                        <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_59),"value"), env.opts.autoescape);
output += "\"\n                                            ";
if(runtime.memberLookup((t_59),"value") == runtime.memberLookup((t_39),"vanilla_value")) {
output += "selected";
;
}
output += ">\n                                            ";
output += runtime.suppressValue(runtime.memberLookup((t_59),"name"), env.opts.autoescape);
output += "\n                                        </option>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                ";
;
}
;
}
;
}
;
}
output += "\n                            </select>\n                        </div>\n                        ";
if(!runtime.inOperator(t_34,["WrinklyDoor","TnsPortal"])) {
output += "\n                            <label for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_39),"reward_id"), env.opts.autoescape);
output += "\" class=\"location-label reward-label\">\n                                Reward\n                            </label>\n                            <div id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_39),"reward_id"), env.opts.autoescape);
output += "_wrapper\"\n                                data-toggle=\"tooltip\"\n                                title>\n                                <select id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_39),"reward_id"), env.opts.autoescape);
output += "\"\n                                        name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_39),"reward_id"), env.opts.autoescape);
output += "\"\n                                        class=\"form-select plando-item-select\">\n                                    <option value=\"\">-- Randomize --</option>\n                                    ";
frame = frame.push();
var t_62 = env.getFilter("plando_custom_loc_item_restrict").call(context, runtime.contextOrFrameLookup(context, frame, "plando_items"),t_34);
if(t_62) {t_62 = runtime.fromIterator(t_62);
var t_61 = t_62.length;
for(var t_60=0; t_60 < t_62.length; t_60++) {
var t_63 = t_62[t_60];
frame.set("item", t_63);
frame.set("loop.index", t_60 + 1);
frame.set("loop.index0", t_60);
frame.set("loop.revindex", t_61 - t_60);
frame.set("loop.revindex0", t_61 - t_60 - 1);
frame.set("loop.first", t_60 === 0);
frame.set("loop.last", t_60 === t_61 - 1);
frame.set("loop.length", t_61);
output += "\n                                        <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_63),"value"), env.opts.autoescape);
output += "\"\n                                            ";
output += runtime.suppressValue((lineno = 88, colno = 76, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "plando_option_class_annotation"), "plando_option_class_annotation", context, ["","","",runtime.memberLookup((t_63),"value")])), env.opts.autoescape);
output += ">\n                                            ";
output += runtime.suppressValue(runtime.memberLookup((t_63),"name"), env.opts.autoescape);
output += "\n                                        </option>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                </select>\n                            </div>\n                        ";
;
}
output += "\n                    </div>\n                ";
;
}
}
frame = frame.pop();
output += "\n            </div>\n        </div>\n    ";
;
}
}
}
frame = frame.pop();
output += "\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["plandomizer/plandomizer_minigames.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n<div class=\"tab-pane plando-pane fade\"\n     id=\"nav-plando-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "panelName"), env.opts.autoescape);
output += "\"\n     role=\"tabpanel\"\n     aria-labelledby=\"nav-plando-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "panelName"), env.opts.autoescape);
output += "-tab\">\n    <h2 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"name"), env.opts.autoescape);
output += "</h2>\n    ";
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"levels");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_1;
if(runtime.isArray(t_3)) {
var t_2 = t_3.length;
for(t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1][0];
frame.set("[object Object]", t_3[t_1][0]);
var t_5 = t_3[t_1][1];
frame.set("[object Object]", t_3[t_1][1]);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_5),"name"), env.opts.autoescape);
output += "</h3>\n        <div class=\"flex-container flex-center\">\n            ";
frame = frame.push();
var t_8 = runtime.memberLookup((t_5),"locations");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("location", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n                <div class=\"location-picker\">\n                    <label for=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_minigame\" class=\"location-label\">\n                        ";
output += runtime.suppressValue(runtime.memberLookup((t_9),"name"), env.opts.autoescape);
output += "\n                    </label>\n                    <div id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_minigame_wrapper\"\n                         data-toggle=\"tooltip\"\n                         title>\n                        <select id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_minigame\"\n                                name=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_minigame\"\n                                class=\"form-select\">\n                            <option value=\"\">-- Randomize --</option>\n                            ";
frame = frame.push();
var t_12 = env.getFilter("plando_minigame_restrict").call(context, runtime.contextOrFrameLookup(context, frame, "plando_minigames"),runtime.memberLookup((t_9),"kong"));
if(t_12) {t_12 = runtime.fromIterator(t_12);
var t_11 = t_12.length;
for(var t_10=0; t_10 < t_12.length; t_10++) {
var t_13 = t_12[t_10];
frame.set("game", t_13);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
output += "\n                                <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_13),"value"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_13),"name"), env.opts.autoescape);
output += "</option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        </select>\n                    </div>\n                </div>\n            ";
;
}
}
frame = frame.pop();
output += "\n        </div>\n    ";
;
}
} else {
t_1 = -1;
var t_2 = runtime.keys(t_3).length;
for(var t_14 in t_3) {
t_1++;
var t_15 = t_3[t_14];
frame.set("_", t_14);
frame.set("levelObj", t_15);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_15),"name"), env.opts.autoescape);
output += "</h3>\n        <div class=\"flex-container flex-center\">\n            ";
frame = frame.push();
var t_18 = runtime.memberLookup((t_15),"locations");
if(t_18) {t_18 = runtime.fromIterator(t_18);
var t_17 = t_18.length;
for(var t_16=0; t_16 < t_18.length; t_16++) {
var t_19 = t_18[t_16];
frame.set("location", t_19);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
output += "\n                <div class=\"location-picker\">\n                    <label for=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_minigame\" class=\"location-label\">\n                        ";
output += runtime.suppressValue(runtime.memberLookup((t_19),"name"), env.opts.autoescape);
output += "\n                    </label>\n                    <div id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_minigame_wrapper\"\n                         data-toggle=\"tooltip\"\n                         title>\n                        <select id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_minigame\"\n                                name=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_minigame\"\n                                class=\"form-select\">\n                            <option value=\"\">-- Randomize --</option>\n                            ";
frame = frame.push();
var t_22 = env.getFilter("plando_minigame_restrict").call(context, runtime.contextOrFrameLookup(context, frame, "plando_minigames"),runtime.memberLookup((t_19),"kong"));
if(t_22) {t_22 = runtime.fromIterator(t_22);
var t_21 = t_22.length;
for(var t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20];
frame.set("game", t_23);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
output += "\n                                <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_23),"value"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_23),"name"), env.opts.autoescape);
output += "</option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        </select>\n                    </div>\n                </div>\n            ";
;
}
}
frame = frame.pop();
output += "\n        </div>\n    ";
;
}
}
}
frame = frame.pop();
output += "\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["plandomizer/plandomizer_shops.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n<style>\n    .shop-cost-picker {\n        display: none; ";
output += "\n        margin-top: 4px;\n    }\n\n    .shop-cost-input {\n        margin: 0 4px;\n        width: 20px;\n    }\n</style>\n<div class=\"tab-pane plando-pane fade\"\n     id=\"nav-plando-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "panelName"), env.opts.autoescape);
output += "\"\n     role=\"tabpanel\"\n     aria-labelledby=\"nav-plando-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "panelName"), env.opts.autoescape);
output += "-tab\">\n    <h2 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"name"), env.opts.autoescape);
output += "</h2>\n    ";
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"levels");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_1;
if(runtime.isArray(t_3)) {
var t_2 = t_3.length;
for(t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1][0];
frame.set("[object Object]", t_3[t_1][0]);
var t_5 = t_3[t_1][1];
frame.set("[object Object]", t_3[t_1][1]);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_5),"name"), env.opts.autoescape);
output += "</h3>\n        <div class=\"flex-container flex-center\">\n            ";
frame = frame.push();
var t_8 = env.getFilter("plando_shop_sort").call(context, runtime.memberLookup((t_5),"locations"));
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("location", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n                <div class=\"location-picker\">\n                    <label for=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_item\" class=\"location-label\">\n                        ";
output += runtime.suppressValue(runtime.memberLookup((t_9),"name"), env.opts.autoescape);
output += "\n                    </label>\n                    <div id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_item_wrapper\"\n                         data-toggle=\"tooltip\"\n                         title>\n                        <select id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_item\"\n                                name=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_item\"\n                                class=\"form-select plando-item-select\">\n                            <option value=\"\">-- Randomize --</option>\n                            ";
frame = frame.push();
var t_12 = env.getFilter("plando_item_restrict").call(context, runtime.contextOrFrameLookup(context, frame, "plando_items"),t_9);
if(t_12) {t_12 = runtime.fromIterator(t_12);
var t_11 = t_12.length;
for(var t_10=0; t_10 < t_12.length; t_10++) {
var t_13 = t_12[t_10];
frame.set("item", t_13);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
output += "\n                                <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_13),"value"), env.opts.autoescape);
output += "\"\n                                    ";
output += runtime.suppressValue((lineno = 34, colno = 68, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "plando_option_class_annotation"), "plando_option_class_annotation", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"name"),runtime.contextOrFrameLookup(context, frame, "kong"),runtime.memberLookup((t_9),"value"),runtime.memberLookup((t_13),"value")])), env.opts.autoescape);
output += ">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_13),"name"), env.opts.autoescape);
output += "\n                                </option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        </select>\n                    </div>\n                    ";
if(runtime.memberLookup((t_9),"value") != "RarewareCoin") {
output += "\n                        <label class=\"shop-cost-picker flex-container flex-center\">\n                            Item Cost:\n                            <div id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_shop_cost_wrapper\"\n                                 data-toggle=\"tooltip\"\n                                 title>\n                                <input type=\"number\"\n                                        min=\"0\"\n                                        max=\"255\"\n                                        step=\"1\"\n                                        data-toggle=\"tooltip\"\n                                        title\n                                        id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_shop_cost\"\n                                        name=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "_shop_cost\"\n                                        class=\"form-control shop-cost-input\">\n                            </div>\n                            Coins\n                        </label>\n                    ";
;
}
output += "\n                </div>\n            ";
;
}
}
frame = frame.pop();
output += "\n        </div>\n    ";
;
}
} else {
t_1 = -1;
var t_2 = runtime.keys(t_3).length;
for(var t_14 in t_3) {
t_1++;
var t_15 = t_3[t_14];
frame.set("_", t_14);
frame.set("levelObj", t_15);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_15),"name"), env.opts.autoescape);
output += "</h3>\n        <div class=\"flex-container flex-center\">\n            ";
frame = frame.push();
var t_18 = env.getFilter("plando_shop_sort").call(context, runtime.memberLookup((t_15),"locations"));
if(t_18) {t_18 = runtime.fromIterator(t_18);
var t_17 = t_18.length;
for(var t_16=0; t_16 < t_18.length; t_16++) {
var t_19 = t_18[t_16];
frame.set("location", t_19);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
output += "\n                <div class=\"location-picker\">\n                    <label for=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_item\" class=\"location-label\">\n                        ";
output += runtime.suppressValue(runtime.memberLookup((t_19),"name"), env.opts.autoescape);
output += "\n                    </label>\n                    <div id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_item_wrapper\"\n                         data-toggle=\"tooltip\"\n                         title>\n                        <select id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_item\"\n                                name=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_item\"\n                                class=\"form-select plando-item-select\">\n                            <option value=\"\">-- Randomize --</option>\n                            ";
frame = frame.push();
var t_22 = env.getFilter("plando_item_restrict").call(context, runtime.contextOrFrameLookup(context, frame, "plando_items"),t_19);
if(t_22) {t_22 = runtime.fromIterator(t_22);
var t_21 = t_22.length;
for(var t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20];
frame.set("item", t_23);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
output += "\n                                <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_23),"value"), env.opts.autoescape);
output += "\"\n                                    ";
output += runtime.suppressValue((lineno = 34, colno = 68, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "plando_option_class_annotation"), "plando_option_class_annotation", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"name"),runtime.contextOrFrameLookup(context, frame, "kong"),runtime.memberLookup((t_19),"value"),runtime.memberLookup((t_23),"value")])), env.opts.autoescape);
output += ">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_23),"name"), env.opts.autoescape);
output += "\n                                </option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        </select>\n                    </div>\n                    ";
if(runtime.memberLookup((t_19),"value") != "RarewareCoin") {
output += "\n                        <label class=\"shop-cost-picker flex-container flex-center\">\n                            Item Cost:\n                            <div id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_shop_cost_wrapper\"\n                                 data-toggle=\"tooltip\"\n                                 title>\n                                <input type=\"number\"\n                                        min=\"0\"\n                                        max=\"255\"\n                                        step=\"1\"\n                                        data-toggle=\"tooltip\"\n                                        title\n                                        id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_shop_cost\"\n                                        name=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_19),"value"), env.opts.autoescape);
output += "_shop_cost\"\n                                        class=\"form-control shop-cost-input\">\n                            </div>\n                            Coins\n                        </label>\n                    ";
;
}
output += "\n                </div>\n            ";
;
}
}
frame = frame.pop();
output += "\n        </div>\n    ";
;
}
}
}
frame = frame.pop();
output += "\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["plandomizer/plandomizer_switches.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "\n<div class=\"tab-pane plando-pane fade\"\n     id=\"nav-plando-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "panelName"), env.opts.autoescape);
output += "\"\n     role=\"tabpanel\"\n     aria-labelledby=\"nav-plando-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "panelName"), env.opts.autoescape);
output += "-tab\">\n    <h2 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"name"), env.opts.autoescape);
output += "</h2>\n        <div class=\"flex-container flex-center\">\n            ";
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "panel")),"locations");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("location", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n                <div class=\"location-picker\">\n                    <label for=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_4),"switch_loc"), env.opts.autoescape);
output += "_switch\" class=\"location-label\">\n                        ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += "\n                    </label>\n                    <div id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_4),"switch_loc"), env.opts.autoescape);
output += "_switch_wrapper\"\n                         data-toggle=\"tooltip\"\n                         title>\n                        <select id=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_4),"switch_loc"), env.opts.autoescape);
output += "_switch\"\n                                name=\"plando_";
output += runtime.suppressValue(runtime.memberLookup((t_4),"switch_loc"), env.opts.autoescape);
output += "_switch\"\n                                class=\"form-select\">\n                            <option value=\"\">-- Randomize --</option>\n                            ";
if(runtime.inOperator(runtime.memberLookup((t_4),"switch_loc"),runtime.contextOrFrameLookup(context, frame, "plando_switches"))) {
output += "\n                                ";
frame = frame.push();
var t_7 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "plando_switches")),runtime.memberLookup((t_4),"switch_loc"));
if(t_7) {t_7 = runtime.fromIterator(t_7);
var t_6 = t_7.length;
for(var t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5];
frame.set("switch", t_8);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\n                                    <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_8),"value"), env.opts.autoescape);
output += "\"\n                                        ";
if(runtime.memberLookup((t_8),"value") == runtime.memberLookup((t_4),"vanilla_value")) {
output += "selected";
;
}
output += ">\n                                        ";
output += runtime.suppressValue(runtime.memberLookup((t_8),"name"), env.opts.autoescape);
output += "\n                                    </option>\n                                ";
;
}
}
frame = frame.pop();
output += "\n                            ";
;
}
else {
output += "\n                                ";
frame = frame.push();
var t_11 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "plando_switches")),runtime.memberLookup((t_4),"switch_type"));
if(t_11) {t_11 = runtime.fromIterator(t_11);
var t_10 = t_11.length;
for(var t_9=0; t_9 < t_11.length; t_9++) {
var t_12 = t_11[t_9];
frame.set("switch", t_12);
frame.set("loop.index", t_9 + 1);
frame.set("loop.index0", t_9);
frame.set("loop.revindex", t_10 - t_9);
frame.set("loop.revindex0", t_10 - t_9 - 1);
frame.set("loop.first", t_9 === 0);
frame.set("loop.last", t_9 === t_10 - 1);
frame.set("loop.length", t_10);
output += "\n                                    <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_12),"value"), env.opts.autoescape);
output += "\"\n                                        ";
if(runtime.memberLookup((t_12),"value") == runtime.memberLookup((t_4),"vanilla_value")) {
output += "selected";
;
}
output += ">\n                                        ";
output += runtime.suppressValue(runtime.memberLookup((t_12),"name"), env.opts.autoescape);
output += "\n                                    </option>\n                                ";
;
}
}
frame = frame.pop();
output += "\n                            ";
;
}
output += "\n                        </select>\n                    </div>\n                </div>\n            ";
;
}
}
frame = frame.pop();
output += "\n        </div>\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["progression.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("macros.html", false, "progression.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "list_selector")) {
var t_4 = t_1.list_selector;
} else {
cb(new Error("cannot import 'list_selector'")); return;
}
context.setVariable("list_selector", t_4);
if(Object.prototype.hasOwnProperty.call(t_1, "slider_input")) {
var t_5 = t_1.slider_input;
} else {
cb(new Error("cannot import 'slider_input'")); return;
}
context.setVariable("slider_input", t_5);
output += "\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div class=\"row\">\n        <div class=\"col border panel\">\n            <h2 class=\"title\">LEVEL REQUIREMENTS</h2>\n            <table id=\"leveltable\">\n                <tr>\n                    <th>Progression</th>\n                    <th>B Locker\n                        <label data-toggle=\"tooltip\"\n                                title=\"Randomize Required B-Locker totals\">\n                            <input class=\"dice_checkbox\"\n                                    type=\"checkbox\"\n                                    name=\"randomize_blocker_required_amounts\"\n                                    id=\"randomize_blocker_required_amounts\"\n                                    display_name=\"Random B. Locker Amounts\"\n                                    value=\"True\"/>\n                            <label for=\"randomize_blocker_required_amounts\"></label>\n                        </label>\n                    </th>\n                    <th>Troff N Scoff\n                        <label data-toggle=\"tooltip\"\n                                title=\"Randomize Required CB totals\">\n                            <input class=\"dice_checkbox\"\n                                    type=\"checkbox\"\n                                    name=\"randomize_cb_required_amounts\"\n                                    id=\"randomize_cb_required_amounts\"\n                                    display_name=\"Randomize CB Required Amounts\"\n                                    value=\"True\"/>\n                            <label for=\"randomize_cb_required_amounts\"></label>\n                        </label>\n                    </th>\n                </tr>\n                ";
frame = frame.push();
var t_8 = (lineno = 33, colno = 33, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [0,8]));
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("i", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n                    <tr>\n                        <td>Level ";
output += runtime.suppressValue(t_9 + 1, env.opts.autoescape);
output += "</td>\n                        <td>\n                            <input class=\"form-control\"\n                                   min=\"0\"\n                                   max=\"200\"\n                                   name=\"blocker_";
output += runtime.suppressValue(t_9, env.opts.autoescape);
output += "\"\n                                   id=\"blocker_";
output += runtime.suppressValue(t_9, env.opts.autoescape);
output += "\"\n                                   style=\"width: 100%\"\n                                   value=\"";
output += runtime.suppressValue(t_9 + 1, env.opts.autoescape);
output += "\"\n                                   type=\"number\"\n                                   data-toggle=\"tooltip\"\n                                   title=\"You can adjust each individual B Locker amount to any number between 0-200.&#10;Note that if you make the game impossible to beat the glitchless, the program does validate if a game is beatable glitchless by adjusting your B Locker settings.&#10;If you are unsure what to adjust the level values to, use the presets dropdown instead.\"/>\n                        </td>\n                        <td>\n                            <input class=\"form-control\"\n                                    min=\"0\"\n                                    max=\"500\"\n                                    name=\"troff_";
output += runtime.suppressValue(t_9, env.opts.autoescape);
output += "\"\n                                    id=\"troff_";
output += runtime.suppressValue(t_9, env.opts.autoescape);
output += "\"\n                                    style=\"width: 100%\"\n                                    value=\"";
output += runtime.suppressValue(t_9 + 1, env.opts.autoescape);
output += "\"\n                                    type=\"number\"\n                                    data-toggle=\"tooltip\"\n                                    title=\"You can adjust each individual Troff n Scoff amount to any number between 1-500.&#10;Note that if you make the game impossible to beat the glitchless, the program does validate if a game is beatable glitchless by adjusting your Troff n Scoff settings.&#10;If you are unsure what to adjust the level values to, use the presets dropdown instead.\"/>\n                        </td>\n                    </tr>\n                ";
;
}
}
frame = frame.pop();
output += "\n            </table>\n            <div class=\"flex-container\">\n                <div style=\"width:50%\">\n                    <div class=\"item-group\" style=\"margin-left:auto;margin-right:auto\">\n                        <p class=\"select-title\">B Locker Max:</p>\n                        <div class=\"input-group mb-3\">\n                            <div class=\"input-group-prepend\"\n                                data-toggle=\"tooltip\"\n                                title=\"Check box to ensure Helm is 'Max Value'.\">\n                                <div class=\"input-group-text\">\n                                    <input type=\"checkbox\"\n                                        value=\"True\"\n                                        id=\"maximize_helm_blocker\"\n                                        name=\"maximize_helm_blocker\"\n                                        display_name=\"Maximize Helm B. Locker\">\n                                </div>\n                            </div>\n                            <input class=\"form-control\"\n                                min=\"0\"\n                                max=\"200\"\n                                name=\"blocker_text\"\n                                id=\"blocker_text\"\n                                display_name=\"B. Locker Max\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Maximum Randomized value\"\n                                default=\"50\"\n                                placeholder=\"50\"/>\n                        </div>\n                    </div>\n                </div>\n                <div style=\"width:50%\">\n                    <div class=\"item-group\" style=\"margin-left:auto;margin-right:auto\">\n                        <p class=\"select-title\">Troff N' Scoff Max:</p>\n                        <input class=\"form-control\"\n                            min=\"0\"\n                            max=\"500\"\n                            name=\"troff_text\"\n                            id=\"troff_text\"\n                            display_name=\"Troff n' Scoff Max\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"Maximum Randomized value\"\n                            default=\"300\"\n                            placeholder=\"300\"/>\n                    </div>\n                </div>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"B. Lockers will require items other than golden bananas to clear. This will override any B. Locker options set above!\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"chaos_blockers\"\n                                display_name=\"Chaos B. Lockers\"\n                                value=\"True\"/>\n                        Chaos B. Lockers\n                    </label>\n                </div>\n                <div class=\"spacer\"></div>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"item-group\" style=\"margin-left:auto;margin-right:auto;margin-top:0;\">\n                    <p class=\"select-title\">Chaos Ratio</p>\n                    <input class=\"form-control\"\n                        min=\"0\"\n                        max=\"100\"\n                        name=\"chaos_ratio\"\n                        id=\"chaos_ratio\"\n                        display_name=\"Chaos Ratio\"\n                        type=\"number\"\n                        data-toggle=\"tooltip\"\n                        title=\"The percentage of an item's maximum amount that your B. Lockers can roll up to. For example, a Chaos Ratio of 25 would have a maximum GB B. Locker of 50 (25% of 200).\"\n                        default=\"25\"\n                        placeholder=\"25\"/>\n                </div>\n                <div class=\"spacer\"></div>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Only relevant in Level Order shuffle. Generally increase the values randomly rolled by B. Lockers, making them closer to the total number of available GBs.\"\n                            style=\"text-align: left\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"hard_blockers\"\n                                id=\"hard_blockers\"\n                                display_name=\"Hard B. Lockers\"\n                                value=\"True\"/>\n                        Hard B. Lockers\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Increase the minimum values rollable by Troff n Scoff.\"\n                            style=\"text-align: left\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"hard_troff_n_scoff\"\n                                id=\"hard_troff_n_scoff\"\n                                display_name=\"Hard Troff n' Scoff\"\n                                value=\"True\"/>\n                        Hard Troff N' Scoff\n                    </label>\n                </div>\n            </div>\n            <hr>\n            <h5 class=\"select-title\">Banana Medal/Fairy Requirements</h5>\n            <div class=\"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Medals for Rareware Coin\n                        <label data-toggle=\"tooltip\"\n                            title=\"Randomizes the amount of banana medals needed for Jetpac.&#10;Range is roughly 4 to 15 with an average of 10.\">\n                        <input class=\"dice_checkbox\"\n                                type=\"checkbox\"\n                                name=\"random_medal_requirement\"\n                                id=\"random_medal_requirement\"\n                                display_name=\"Randomize Medals for Rareware Coin\"\n                                value=\"True\"/>\n                        <label for=\"random_medal_requirement\"></label>\n                        </label>\n                    </p>\n                    <input min=\"0\"\n                            max=\"40\"\n                            name=\"medal_requirement\"\n                            id=\"medal_requirement\"\n                            display_name=\"Medals for Rareware Coin\"\n                            style=\"width: 15%\"\n                            class=\"form-control center-div\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"Amount of Banana Medals Required for Jetpac/Rareware Coin.\"\n                            default=\"15\"\n                            placeholder=\"15\"/>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Medal Color Banana Requirement</p>\n                    <input min=\"1\"\n                            max=\"100\"\n                            name=\"medal_cb_req\"\n                            id=\"medal_cb_req\"\n                            display_name=\"Randomize Medal CB Requirement\"\n                            style=\"width: 15%\"\n                            class=\"form-control center-div\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"Amount of Colored Bananas required for Banana Medals.\"\n                            default=\"75\"\n                            placeholder=\"75\"/>\n                </div>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Fairies for Rareware GB</p>\n                    <input min=\"0\"\n                            max=\"20\"\n                            name=\"rareware_gb_fairies\"\n                            id=\"rareware_gb_fairies\"\n                            display_name=\"Fairies for Rareware GB\"\n                            style=\"width: 15%\"\n                            class=\"form-control center-div\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"Amount of fairies required to open the Rareware Door in Fairy Island.\"\n                            default=\"20\"\n                            placeholder=\"20\"/>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Pearls for Mermaid GB</p>\n                    <input min=\"0\"\n                            max=\"5\"\n                            name=\"mermaid_gb_pearls\"\n                            id=\"mermaid_gb_pearls\"\n                            display_name=\"Pearls for Mermaid GB\"\n                            style=\"width: 15%\"\n                            class=\"form-control center-div\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"Amount of pearls required to get the mermaid's reward.\"\n                            default=\"5\"\n                            placeholder=\"5\"/>\n                </div>\n            </div>\n        </div>\n        <div class=\"col border panel\">\n            <h2 class=\"title\">GAME LENGTH SETTINGS</h2>\n            <h5 class=\"select-title\">K-Rool Phase Length\n                <label data-toggle=\"tooltip\"\n                        title=\"Selects a random number of K Rool Phases.\">\n                    <input class=\"dice_checkbox\"\n                            type=\"checkbox\"\n                            name=\"krool_random\"\n                            display_name=\"Random K. Rool Phase Count\"\n                            onchange=\"toggle_clicks()\"\n                            id=\"krool_random\"\n                            value=\"True\"/>\n                    <label for=\"krool_random\"></label>\n                </label></h5>\n            <div>\n                ";
output += runtime.suppressValue((lineno = 262, colno = 31, runtime.callWrap(t_5, "slider_input", context, ["krool_phase_count","K. Rool Phase Count",1,5])), env.opts.autoescape);
output += "\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch center-flex\">\n                    <label data-toggle=\"tooltip\" title=\"All Cannon Barrels require Baboon Blast to use. This includes DK Phase of K Rool.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"cannons_require_blast\"\n                                id=\"cannons_require_blast\"\n                                display_name=\"DK Phase requires Baboon Blast\"\n                                onchange=\"toggle_clicks()\"\n                                value=\"True\"/>\n                        DK Phase requires blast\n                    </label>\n                </div>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Chunky Phase Slam Requirement</p>\n                    <select name=\"chunky_phase_slam_req\"\n                            id=\"chunky_phase_slam_req\"\n                            display_name=\"Chunky Phase Slam Requirement\"\n                            class=\"form-select center-div\"\n                            aria-label=\"Chunky Phase Slam Requirement\"\n                            data-toggle=\"tooltip\"\n                            title=\"Set the level of slam required for Chunky Phase.\">\n                        <option id=\"green\" value=\"green\">\n                            Base Slam\n                        </option>\n                        <option selected id=\"blue\" value=\"blue\">\n                            Super Slam\n                        </option>\n                        <option id=\"red\" value=\"red\">\n                            Super Duper Slam\n                        </option>\n                        <option id=\"random\" value=\"random\">\n                            Random Slam\n                        </option>\n                    </select>\n                </div>\n            </div>\n            <hr>\n            <h5 class=\"select-title\">Helm Length\n                <label data-toggle=\"tooltip\"\n                        title=\"Selects a random number of rooms that need to be completed in Hideout Helm.\">\n                    <input class=\"dice_checkbox\"\n                            type=\"checkbox\"\n                            name=\"helm_random\"\n                            onchange=\"toggle_clicks()\"\n                            id=\"helm_random\"\n                            display_name=\"Random Helm Length\"\n                            value=\"True\"/>\n                    <label for=\"helm_random\"></label>\n                </label></h5>\n            <div>\n                ";
output += runtime.suppressValue((lineno = 317, colno = 31, runtime.callWrap(t_5, "slider_input", context, ["helm_phase_count","Helm Length",1,5])), env.opts.autoescape);
output += "\n            </div>\n            <hr>\n            <h5 class=\"select-title\">Keys Required To Beat K. Rool\n                <label data-toggle=\"tooltip\"\n                        title=\"Selects a random amount of pre-turned in Keys.&#10;i.e. Selecting '5' means 3 keys will be pre-turned in and you need 5 more.\">\n                    <input class=\"dice_checkbox\"\n                            type=\"checkbox\"\n                            name=\"keys_random\"\n                            id=\"keys_random\"\n                            display_name=\"Randomize Keys Required to Beat K. Rool\"\n                            onchange=\"toggle_clicks()\"\n                            value=\"True\"/>\n                    <label for=\"keys_random\"></label>\n                </label></h5>\n            <div class=\"flex-container\" style=\"justify-content: space-between; width: 90%; margin: auto;\">\n                <div style=\"display: flex;\">Start with More Keys</div>\n                <div style=\"display: flex;\">Start with Fewer Keys</div>\n            </div>\n            <div class=\"flex-container flex-center\">\n                ";
output += runtime.suppressValue((lineno = 337, colno = 31, runtime.callWrap(t_5, "slider_input", context, ["krool_key_count","Keys required to Beat K. Rool",0,8])), env.opts.autoescape);
output += "\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch center-flex\">\n                    <label data-toggle=\"tooltip\" title=\"Select the keys you are guaranteed start with.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"select_keys\"\n                                id=\"select_keys\"\n                                display_name=\"Guaranteed Starting Keys\"\n                                onchange=\"toggle_clicks()\"\n                                value=\"True\"/>\n                        Guaranteed Starting Keys\n                    </label>\n                    ";
output += runtime.suppressValue((lineno = 351, colno = 36, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "keys"),"starting_keys_list","STARTING KEYS SELECTOR","This will open a popup that will let you customize what Keys you start with.&#10;This defaults to starting with no keys if none are selected.",8])), env.opts.autoescape);
output += "\n                </div>\n                <div class=\"flex-container\">\n                    <div class=\"form-check form-switch item-switch\">\n                        <label data-toggle=\"tooltip\"\n                                title=\"Lock a key in Helm. The key will correspond to Helm's place in the level order. In non-complex Level order shuffle, this also forces Key 8 to be in the eighth level.\">\n                            <input class=\"form-check-input\"\n                                    type=\"checkbox\"\n                                    name=\"key_8_helm\"\n                                    id=\"key_8_helm\"\n                                    display_name=\"Helm Key Lock\"\n                                    value=\"True\"/>\n                            Helm Key Lock\n                        </label>\n                    </div>\n                    <div class=\"form-check form-switch item-switch\">\n                        <label data-toggle=\"tooltip\"\n                                title=\"Make it required to get Key 8 or leave it up to chance.\">\n                            <input class=\"form-check-input\"\n                                    type=\"checkbox\"\n                                    name=\"krool_access\"\n                                    id=\"krool_access\"\n                                    display_name=\"Key 8 Required\"\n                                    value=\"True\"/>\n                            Key 8 Required\n                        </label>\n                    </div>\n                    <div class=\"form-check form-switch item-switch\">\n                        <label data-toggle=\"tooltip\"\n                                title=\"K. Rool will require only keys 3 and 8 to appear, just like in the vanilla game.\">\n                            <input class=\"form-check-input\"\n                                    type=\"checkbox\"\n                                    name=\"k_rool_vanilla_requirement\"\n                                    id=\"k_rool_vanilla_requirement\"\n                                    display_name=\"Vanilla K. Rool Requirement\"\n                                    value=\"True\"/>\n                            Vanilla K. Rool Requirement\n                        </label>\n                    </div>\n                    <div class=\"spacer\"></div>\n                </div>\n                <hr>\n                <h5 class=\"select-title\">Number of Starting Kongs\n                    <label data-toggle=\"tooltip\"\n                            title=\"Selects a random value from Slider to determine how many kongs you start with.\">\n                        <input class=\"dice_checkbox\"\n                                type=\"checkbox\"\n                                name=\"starting_random\"\n                                id=\"starting_random\"\n                                display_name=\"Randomize number of starting Kongs\"\n                                onchange=\"toggle_clicks()\"\n                                value=\"True\"/>\n                        <label for=\"starting_random\"></label>\n                    </label>\n                </h5>\n                ";
output += runtime.suppressValue((lineno = 406, colno = 31, runtime.callWrap(t_5, "slider_input", context, ["starting_kongs_count","Starting Kongs count",1,5])), env.opts.autoescape);
output += "\n                <div class=\"flex-container\" style=\"justify-content: center;\">\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">Select Starting Kong</p>\n                        <select name=\"starting_kong\"\n                                id=\"starting_kong\"\n                                display_name=\"Selected Starting Kongs\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Door 1 Requirements\"\n                                data-toggle=\"tooltip\"\n                                title=\"Specify your starting Kong. This kong will always be included in your starting set. Leave as Any to remain random.\">\n                            <option selected id=\"any\" value=\"any\">\n                                Any\n                            </option>\n                            <option id=\"donkey\" value=\"donkey\">\n                                Donkey\n                            </option>\n                            <option id=\"diddy\" value=\"diddy\">\n                                Diddy\n                            </option>\n                            <option id=\"lanky\" value=\"lanky\">\n                                Lanky\n                            </option>\n                            <option id=\"tiny\" value=\"tiny\">\n                                Tiny\n                            </option>\n                            <option id=\"chunky\" value=\"chunky\">\n                                Chunky\n                            </option>\n                        </select>\n                    </div>\n                </div>\n                <hr>\n                <h5 class=\"select-title\">Helm Door Requirements</h5>\n                <div class=\"flex-container\">\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">Door 1 Requirements</p>\n                        <div class=\"d-flex select-number-container\" id=\"door_1_container\">\n                            <select name=\"crown_door_item\"\n                                    id=\"crown_door_item\"\n                                    display_name=\"Helm Door 1 Requirement Item\"\n                                    class=\"form-select center-div\"\n                                    aria-label=\"Door 1 Requirements\"\n                                    data-toggle=\"tooltip\"\n                                    title=\"Changes the requirement to open the first door in Helm\">\n                                <option selected id=\"vanilla\" value=\"vanilla\" title=\"\">\n                                    Vanilla (Crowns)\n                                </option>\n                                <option id=\"opened\" value=\"opened\">\n                                    Opened\n                                </option>\n                                <option id=\"easy_random\" value=\"easy_random\">\n                                    Random (Easy)\n                                </option>\n                                <option id=\"medium_random\" value=\"medium_random\">\n                                    Random (Medium)\n                                </option>\n                                <option id=\"hard_random\" value=\"hard_random\">\n                                    Random (Hard)\n                                </option>\n                                <option id=\"req_gb\" value=\"req_gb\">\n                                    Golden Bananas\n                                </option>\n                                <option id=\"req_bp\" value=\"req_bp\">\n                                    Blueprints\n                                </option>\n                                <option id=\"req_companycoins\" value=\"req_companycoins\">\n                                    Company Coins\n                                </option>\n                                <option id=\"req_key\" value=\"req_key\">\n                                    Keys\n                                </option>\n                                <option id=\"req_medal\" value=\"req_medal\">\n                                    Medals\n                                </option>\n                                <option id=\"req_fairy\" value=\"req_fairy\">\n                                    Fairies\n                                </option>\n                                <option id=\"req_rainbowcoin\" value=\"req_rainbowcoin\">\n                                    Rainbow Coins\n                                </option>\n                                <option id=\"req_bean\" value=\"req_bean\">\n                                    Bean\n                                </option>\n                                <option id=\"req_pearl\" value=\"req_pearl\">\n                                    Pearls\n                                </option>\n                            </select>\n                            <input min=\"0\"\n                                max=\"201\"\n                                name=\"crown_door_item_count\"\n                                id=\"crown_door_item_count\"\n                                display_name=\"Helm Door 1 Requirement Count\"\n                                class=\"form-control center-div\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Amount of the item specified to open the door.\"\n                                default=\"1\"\n                                placeholder=\"1\"/>\n                        </div>\n                    </div>\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">Door 2 Requirements</p>\n                        <div class=\"d-flex select-number-container\" id=\"door_2_container\">\n                            <select name=\"coin_door_item\"\n                                    id=\"coin_door_item\"\n                                    display_name=\"Helm Door 2 Requirement Item\"\n                                    class=\"form-select center-div\"\n                                    aria-label=\"Door 2 Requirements\"\n                                    data-toggle=\"tooltip\"\n                                    title=\"Changes the requirement to open the second door in Helm\">\n                                <option selected id=\"vanilla\" value=\"vanilla\" title=\"\">\n                                    Vanilla (Company Coins)\n                                </option>\n                                <option id=\"opened\" value=\"opened\">\n                                    Opened\n                                </option>\n                                <option id=\"easy_random\" value=\"easy_random\">\n                                    Random (Easy)\n                                </option>\n                                <option id=\"medium_random\" value=\"medium_random\">\n                                    Random (Medium)\n                                </option>\n                                <option id=\"hard_random\" value=\"hard_random\">\n                                    Random (Hard)\n                                </option>\n                                <option id=\"req_gb\" value=\"req_gb\">\n                                    Golden Bananas\n                                </option>\n                                <option id=\"req_bp\" value=\"req_bp\">\n                                    Blueprints\n                                </option>\n                                <option id=\"req_key\" value=\"req_key\">\n                                    Keys\n                                </option>\n                                <option id=\"req_medal\" value=\"req_medal\">\n                                    Medals\n                                </option>\n                                <option id=\"req_crown\" value=\"req_crown\">\n                                    Crowns\n                                </option>\n                                <option id=\"req_fairy\" value=\"req_fairy\">\n                                    Fairies\n                                </option>\n                                <option id=\"req_rainbowcoin\" value=\"req_rainbowcoin\">\n                                    Rainbow Coins\n                                </option>\n                                <option id=\"req_bean\" value=\"req_bean\">\n                                    Bean\n                                </option>\n                                <option id=\"req_pearl\" value=\"req_pearl\">\n                                    Pearls\n                                </option>\n                            </select>\n                            <input min=\"0\"\n                                max=\"201\"\n                                name=\"coin_door_item_count\"\n                                id=\"coin_door_item_count\"\n                                display_name=\"Helm Door 2 Requirement Count\"\n                                class=\"form-control center-div\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Amount of the item specified to open the door.\"\n                                default=\"1\"\n                                placeholder=\"1\"/>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n</div>\n<script>\n    $('.nav-tabs').click(function() {\n        setTimeout(() => {\n            toggle_clicks()\n        }, 200);\n    })\n    \n    function toggle_clicks() {\n        if (document.getElementById(\"krool_random\").checked === true) {\n            $(\"#krool_phase_count\").prop(\"disabled\", true)\n        } else {\n            $(\"#krool_phase_count\").prop(\"disabled\", false)\n        }\n        if (document.getElementById(\"helm_random\").checked === true) {\n            $(\"#helm_phase_count\").prop(\"disabled\", true)\n        } else {\n            $(\"#helm_phase_count\").prop(\"disabled\", false)\n        }\n        if (document.getElementById(\"keys_random\").checked === true) {\n            $(\"#krool_key_count\").prop(\"disabled\", true)\n        } else {\n            $(\"#krool_key_count\").prop(\"disabled\", false)\n        }\n        if (document.getElementById(\"starting_random\").checked === true) {\n            $(\"#starting_kongs_count\").prop(\"disabled\", true)\n        } else {\n            $(\"#starting_kongs_count\").prop(\"disabled\", false)\n        }\n    }\n    $(function() {\n        $('[data-toggle=\"tooltip\"]').tooltip({\n            trigger: 'hover'\n        })\n    })\n</script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["qualityoflife.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("macros.html", false, "qualityoflife.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "list_selector")) {
var t_4 = t_1.list_selector;
} else {
cb(new Error("cannot import 'list_selector'")); return;
}
context.setVariable("list_selector", t_4);
if(Object.prototype.hasOwnProperty.call(t_1, "properties_selector")) {
var t_5 = t_1.properties_selector;
} else {
cb(new Error("cannot import 'properties_selector'")); return;
}
context.setVariable("properties_selector", t_5);
output += "\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div class=\"row\">\n        <div class=\"col border panel\">\n            <h2 class=\"title\">GAMEPLAY</h2>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"This option enables various quality of life changes.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"quality_of_life\"\n                               id=\"misc_changes_toggle\"\n                               display_name=\"Misc Changes\"\n                               value=\"True\"\n                               checked/>\n                        Misc Changes\n                    </label>\n                    ";
output += runtime.suppressValue((lineno = 18, colno = 36, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "misc_changes"),"misc_changes","MISC CHANGES","This will open a popup that will let you customize what Quality of Life Options are active.&#10;This defaults to All options.",18,1])), env.opts.autoescape);
output += "\n                    ";
output += "\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"This option shortens all of the longer boss fights in the game.&#10;\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"shorten_boss\"\n                                id=\"shorten_boss\"\n                                display_name=\"Shorten Boss Fights\"\n                                value=\"True\"/>\n                        Shorten Boss Fights\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"This option will allow you to switch kongs almost anywhere using DPad left or DPad right.&#10;You will still need to unlock the kong you want if Unlock All Kongs isn't enabled.&#10;You cannot switch kongs in rooms or areas that would otherwise break the puzzle.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"enable_tag_anywhere\"\n                                id=\"enable_tag_anywhere\"\n                                display_name=\"Enable Tag Anywhere\"\n                                value=\"True\"/>\n                        Enable Tag Anywhere\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"This option will add hints as to what move you are purchasing in shops.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"enable_shop_hints\"\n                                display_name=\"Enable Shop Hints\"\n                                value=\"True\"/>\n                        Enable Shop Hints\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Will display the face of each Kong that has a move to purchase there or 'SOLD OUT' if all moves are purchased.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"shop_indicator\"\n                                display_name=\"Shop Indicator\"\n                                value=\"True\"\n                                checked/>\n                        Shop Indicator\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Disables the check on Wrinkly Doors for having the appropriate kong unlocked.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"wrinkly_available\"\n                                display_name=\"Kongless Hint Doors\"\n                                value=\"True\"/>\n                        Kongless Hint Doors\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Warping to the DK isles is directly allowed from the pause menu.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"warp_to_isles\"\n                                display_name=\"Warp to Isles menu option\"\n                                value=\"True\"/>\n                        Warp to Isles menu option\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\" title=\"Speeds up the Bananaport animation.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"fast_warps\"\n                                display_name=\"Fast Warps\"\n                                value=\"True\"/>\n                        Fast Warps\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Automatically turns in keys once you collect them.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"auto_keys\"\n                                display_name=\"Auto Key Turn Ins\"\n                                value=\"True\"/>\n                        Auto Key Turn ins\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\" hidden>\n                    <label data-toggle=\"tooltip\" title=\"Training Barrels complete, start with Simian Slam, spawn in DK Isles, Japes lobby entrance open.\">\n                        <input class=\"form-check-input\" \n                                type=\"checkbox\" \n                                name=\"fast_start_beginning_of_game_dummy\" \n                                id=\"fast_start_beginning_of_game_dummy\" \n                                display_name=\"Fast Start - Beginning of Game\" \n                                value=\"True\"/>\n                        Fast Start - Beginning of Game\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Killing enemies in battle crowns will reduce the time remaining on a crown.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"enemy_kill_crown_timer\"\n                                display_name=\"Enemy Crown Timer Reduction\"\n                                value=\"True\"/>\n                        Enemy Crown Timer Reduction\n                    </label>\n                </div>\n                <div class=\"spacer\"></div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Helm Start Location</p>\n                    <select name=\"helm_setting\"\n                            id=\"helm_setting\"\n                            display_name=\"Helm Start Location\"\n                            class=\"form-select center-div\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"This option will shorten the time it takes to beat Hideout Helm.&#10;Skip Start adds the following changes:&#10;- You will spawn in the Blast o Matic room.&#10;- Opens the roman numeral doors to each Kong's room.&#10;- The gates in front of the music pads are gone.&#10;Skip All: Spawns you at the crown door.\">\n                        <option selected value=\"default\">\n                            Vanilla\n                        </option>\n                        <option value=\"skip_start\">\n                            Skip Start\n                        </option>\n                        <option value=\"skip_all\">\n                            Skip All\n                        </option>\n                    </select>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Helm Room Bonus Count</p>\n                    <select name=\"helm_room_bonus_count\"\n                            id=\"helm_room_bonus_count\"\n                            display_name=\"Helm Room Bonus Count\"\n                            class=\"form-select center-div\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Determines how many bonus barrels are required to beat a helm room. If set to zero, playing the instrument pad will complete a helm room.\">\n                        <option selected value=\"two\">\n                            Two\n                        </option>\n                        <option value=\"one\">\n                            One\n                        </option>\n                        <option value=\"zero\">\n                            Zero\n                        </option>\n                    </select>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Cutscene Skips</p>\n                    <select name=\"more_cutscene_skips\"\n                            id=\"more_cutscene_skips\"\n                            display_name=\"Cutscene Skips\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"More cutscenes will be skipped. Selecting 'Press Start to Skip' will skip those cutscenes by pressing Start. Selecting Automatic will skip those cutscenes automatically.\">\n                        <option value=\"off\">\n                            Off\n                        </option>\n                        <option value=\"press\">\n                            Press Start to Skip\n                        </option>\n                        <option value=\"auto\" selected>\n                            Automatic\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n        <div class=\"col border panel\">\n            <h2 class=\"title\">HINTS</h2>\n            <a class=\"btn btn-secondary\" href=\"./wiki/All-About-Hints.html\" target=\"_blank\">\n                All About Hints\n                <img class=\"icon\" src=\"./static/img/external_link.png\">\n            </a>\n            <div class=\"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Wrinkly Hints</p>\n                    <select name=\"wrinkly_hints\"\n                            id=\"wrinkly_hints\"\n                            display_name=\"Wrinkly Hints\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Wrinkly hints are replaced with useful hints.&#10;Standard - The recommended default hint experience, flexible across all settings.&#10;Cryptic - Same as default, with phrasing tweaks to be less direct.&#10;Item Hinting - A simpler hint system hinting as many items as possible, prioritizing Kongs, Keys, and required moves.&#10;Advanced Item Hinting - Same as above, but hints are less direct about what they lead you to.&#10;Off - Wrinkly doors have vanilla text.\">\n                        <option selected value=\"standard\">\n                            Standard\n                        </option>\n                        <option value=\"cryptic\">\n                            Cryptic\n                        </option>\n                        ";
output += "\n                        <option value=\"item_hinting\">\n                            Item Hinting\n                        </option>\n                        <option value=\"item_hinting_advanced\">\n                            Advanced Item Hinting\n                        </option>\n                        <option value=\"off\">\n                            Off\n                        </option>\n                    </select>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\" style=\"margin-bottom:5px;\">Progressive Hints</p>\n                    <div class=\"d-flex select-number-container\" id=\"progressive_hint_container\">\n                        <select name=\"progressive_hint_item\"\n                                id=\"progressive_hint_item\"\n                                display_name=\"Progressive Hint Item\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Progressive Hint Item\"\n                                data-toggle=\"tooltip\"\n                                title=\"The item required to obtain a hint through the progressive hint system, where hints are given on the pause menu for collecting x amount of a certain item rather than visiting Wrinkly..\">\n                            <option selected id=\"off\" value=\"off\" title=\"\">\n                                Off\n                            </option>\n                            <option id=\"req_gb\" value=\"req_gb\">\n                                Golden Bananas\n                            </option>\n                            <option id=\"req_bp\" value=\"req_bp\">\n                                Blueprints\n                            </option>\n                            <option id=\"req_key\" value=\"req_key\">\n                                Keys\n                            </option>\n                            <option id=\"req_medal\" value=\"req_medal\">\n                                Medals\n                            </option>\n                            <option id=\"req_crown\" value=\"req_crown\">\n                                Crowns\n                            </option>\n                            <option id=\"req_fairy\" value=\"req_fairy\">\n                                Fairies\n                            </option>\n                            <option id=\"req_rainbowcoin\" value=\"req_rainbowcoin\">\n                                Rainbow Coins\n                            </option>\n                            ";
output += "\n                            <option id=\"req_pearl\" value=\"req_pearl\">\n                                Pearls\n                            </option>\n                            <option id=\"req_cb\" value=\"req_cb\">\n                                Colored Bananas\n                            </option>\n                        </select>\n                        <input min=\"1\"\n                                max=\"3500\"\n                                name=\"progressive_hint_count\"\n                                id=\"progressive_hint_count\"\n                                display_name=\"Progressive Hint 35 Requirement\"\n                                class=\"form-control center-div\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Item count requirement for the 35th hint with progressive Hints.\"\n                                default=\"1\"\n                                placeholder=\"1\"/>\n                    </div>\n                </div>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Hints are dimmed on the pause menu when a hint has been solved.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"dim_solved_hints\"\n                                display_name=\"Dim Solved Hints\"\n                                value=\"True\"\n                                />\n                        Dim solved hints\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"No joke hints will be placed.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"serious_hints\"\n                                display_name=\"No Joke Hints\"\n                                value=\"True\"\n                                />\n                        No Joke Hints\n                    </label>\n                </div>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Spoiler Hints</p>\n                    <select name=\"spoiler_hints\"\n                            id=\"spoiler_hints\"\n                            display_name=\"Spoiler Hints\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Adds hints to the spoiler log that reveals specific information about the seed.&#10;Vials - Kongs, Keys, and vials will be revealed for each level.&#10;Points - Each level has a number of points assigned to it based on the items the level contains. The point values for each item can be customized with the gear [TBD].\">\n                        <option value=\"vial_colors\">\n                            Vials\n                        </option>\n                        <option selected value=\"points\">\n                            Points\n                        </option>\n                        <option selected value=\"off\">\n                            Off\n                        </option>\n                    </select>\n                    <div>\n                    Customize Points\n                    ";
output += runtime.suppressValue((lineno = 337, colno = 42, runtime.callWrap(t_5, "properties_selector", context, [runtime.contextOrFrameLookup(context, frame, "points_spread"),"points_list","POINTS SPREAD","This will open a popup that will let you customize your points spread."])), env.opts.autoescape);
output += "\n                    ";
output += "\n                    <div class=\"form-check form-switch\" style=\"padding-top:10px;\">\n                        <label data-toggle=\"tooltip\"\n                                style=\"font-size:14px;\"\n                                title=\"Spoiler hints will includes the count of spoiler-hinted WotH (strictly required) items in each level.\">\n                            <input class=\"form-check-input\"\n                                    type=\"checkbox\"\n                                    name=\"spoiler_include_woth_count\"\n                                    display_name=\"Include WotH Counts in Spoiler Hints\"\n                                    value=\"True\"/>\n                            Include WotH Counts\n                        </label>\n                    </div>\n                    <div class=\"form-check form-switch\" style=\"padding-top:10px;\">\n                        <label data-toggle=\"tooltip\"\n                                style=\"font-size:14px;\"\n                                title=\"Spoiler hints will includes the level order.\">\n                            <input class=\"form-check-input\"\n                                    type=\"checkbox\"\n                                    name=\"spoiler_include_level_order\"\n                                    display_name=\"Include Level Order in Spoiler Hints\"\n                                    value=\"True\"/>\n                            Include Level Order\n                        </label>\n                    </div>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Extra Hints</p>\n                    <select name=\"microhints_enabled\"\n                            id=\"microhints_enabled\"\n                            display_name=\"Extra Hints\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Extra hints are placed in late-game to provide extra information if you are stuck on where an item is.&#10;- Monkeyport will be hinted upon touching the lower Monkeyport pad in Isles with enough GBs to enter all of the first 7 levels.&#10;- Gorilla Gone will be hinted upon touching the pad inside Helm Lobby.&#10;- Instruments will be hinted upon touching their pad in Helm.&#10;'Some' will have Monkeyport and Gorilla Gone hints, while 'All' also includes Instrument hints.\">\n                        <option value=\"all\"\n                                title=\"Includes hints in Hideout Helm for the 5 instruments\">\n                            All\n                        </option>\n                        <option selected value=\"base\">\n                            Some\n                        </option>\n                        <option value=\"off\">\n                            Off\n                        </option>\n                    </select>\n                </div>\n            </div>\n            \n            <hr />\n            <h2 class=\"title\">OTHER</h2>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Displays an FPS counter tracked by the game itself.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"fps_display\"\n                                display_name=\"FPS Display\"\n                                value=\"True\"/>\n                        FPS Display\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Numbers are displayed on the outside portal of a troff n scoff zone of the amount of bananas still required.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"portal_numbers\"\n                                value=\"True\"\n                                display_name=\"Troff n Scoff Portal Numbers\"\n                                checked/>\n                        Troff n Scoff portal numbers\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Enables indicators for some checks:&#10;- Bonus Barrel Skin will match the reward you get for beating the bonus barrel.&#10;- The reward for completing a boss will be shown behind the boss door once you open it.&#10;- The reward for completing a battle crown will be shown in the background during a crown battle.&#10;- Text-based reward hints in various locations before completing a race or otherwise lengthy quest.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"item_reward_previews\"\n                                display_name=\"Item Reward Previews\"\n                                value=\"True\"\n                                checked/>\n                        Item Reward Previews\n                    </label>\n                </div>\n                <div class=\"spacer\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n    <script>\n        $(function() {\n            $('[data-toggle=\"tooltip\"]').tooltip({\n                trigger: 'hover'\n            })\n        })\n    </script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["rando_options.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("macros.html", false, "rando_options.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "list_selector")) {
var t_4 = t_1.list_selector;
} else {
cb(new Error("cannot import 'list_selector'")); return;
}
context.setVariable("list_selector", t_4);
if(Object.prototype.hasOwnProperty.call(t_1, "toggle_input")) {
var t_5 = t_1.toggle_input;
} else {
cb(new Error("cannot import 'toggle_input'")); return;
}
context.setVariable("toggle_input", t_5);
output += "\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div class=\"row\">\n        <div class=\"col border panel\">\n            <h2 class=\"title\">MAJOR ITEMS</h2>\n            <div class=\"flex-container\">\n                <div class=\"flex-column-container\"  style=\"margin-bottom: 10px;\">\n                    <div class=\"form-check form-switch item-switch\" style=\"max-height: 24px;\">\n                        <label data-toggle=\"tooltip\" title=\"Items are shuffled amongst each other.\">\n                            <input class=\"form-check-input\"\n                                    type=\"checkbox\"\n                                    name=\"shuffle_items\"\n                                    id=\"shuffle_items\"\n                                    display_name=\"Item Randomizer\"\n                                    value=\"True\"/>\n                            Item Randomizer\n                        </label>\n                        <span id=\"non_item_rando_warning\" data-toggle=\"tooltip\" title=\"With item rando disabled, you cannot start without items you get from the Training Grounds in vanilla!\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" data-name=\"Layer 1\" viewBox=\"0 0 24 24\" class=\"warning-icon\" stroke=\"#ffff00\" fill=\"#ffff00\">\n                                <path d=\"M14.876,2.672a3.309,3.309,0,0,0-5.752,0L.414,18.19a3.178,3.178,0,0,0,.029,3.189A3.264,3.264,0,0,0,3.29,23H20.71a3.264,3.264,0,0,0,2.847-1.621,3.178,3.178,0,0,0,.029-3.189ZM12,19a1,1,0,1,1,1-1A1,1,0,0,1,12,19Zm1-5a1,1,0,0,1-2,0V8a1,1,0,0,1,2,0Z\"/>\n                            </svg>\n                        </span>\n                        ";
output += runtime.suppressValue((lineno = 22, colno = 40, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "itemRando"),"item_rando_list","ITEM RANDO SELECTOR","This will open a popup that will let you customize what items are shuffled in the pool.&#10;This defaults to All options.",15,1])), env.opts.autoescape);
output += "\n                    ";
output += "\n                    <div class=\"form-check form-switch item-switch\" style=\"max-height: 24px;\">\n                        <label data-toggle=\"tooltip\" title=\"Sparkling enemies can drop major items. Highly chaotic, adding lots of checks all over the world.\">\n                            <input class=\"form-check-input\"\n                                    type=\"checkbox\"\n                                    name=\"enemy_drop_rando\"\n                                    id=\"enemy_drop_rando\"\n                                    display_name=\"Dropsanity\"\n                                    value=\"True\"/>\n                            Dropsanity\n                        </label>\n                    </div>\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">Move Randomizer</p>\n                        <select name=\"move_rando\"\n                                id=\"move_rando\"\n                                display_name=\"Move Randomizer\"\n                                class=\"form-select\"\n                                aria-label=\"Randomization type\"\n                                data-toggle=\"tooltip\"\n                                title=\"Determines if and how moves are randomized.&#10;-Vanilla: Moves are in their vanilla locations and can only be bought by their normal kongs.&#10;-Shuffle: Moves can be randomized to different shops, but must still be bought by their normal kong. Shared moves can be bought by any kong.&#10;-Cross Kong Purchases: Kongs can now purchase another kongs moves. Shop Indicator will still show which kong buys the move.\">\n                            <option id=\"move_off\"\n                                    selected\n                                    value=\"off\"\n                                    title=\"Moves are in their vanilla locations and can only be bought by their normal kongs.\">\n                                Vanilla\n                            </option>\n                            <option id=\"move_on\" value=\"on\">\n                                Shuffle\n                            </option>\n                            <option id=\"move_on_cross_purchase\" value=\"cross_purchase\">\n                                Cross Kong Purchases\n                            </option>\n                        </select>\n                    </div>\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">Ice Trap Frequency</p>\n                        <select name=\"ice_trap_frequency\"\n                                id=\"ice_trap_frequency\"\n                                display_name=\"Ice Trap Frequency\"\n                                class=\"form-select\"\n                                aria-label=\"Ice Trap Frequency\"\n                                data-toggle=\"tooltip\"\n                                title=\"Frequency of ice traps attempted to be placed into the world.&#10;-Rare: 4 ice traps.&#10;-Mild: 10 ice traps.&#10;-Common: 32 ice traps.&#10;-Frequent: 64 ice traps.&#10;-Pain: 100 ice traps.\">\n                            <option id=\"rare\" value=\"rare\">Rare</option>\n                            <option id=\"mild\" selected value=\"mild\">Mild</option>\n                            <option id=\"common\" value=\"common\">Common</option>\n                            <option id=\"frequent\" value=\"frequent\">Frequent</option>\n                            <option id=\"pain\" value=\"pain\">Pain</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"flex-column-container\" style=\"flex-grow: 1\">\n                    <div class=\"item-select\" style=\"margin-top: 0; max-height: 34px;\">\n                        <button\n                            class=\"btn btn-secondary btn-custom-large\"\n                            type=\"button\"\n                            href=\"#\"\n                            id=\"starting_moves_modal\"\n                            display_name=\"Customize Starting Moves\"\n                            data-bs-toggle=\"modal\"\n                            data-bs-target=\"#starting_moves_Modal\"\n                            data-toggle=\"tooltip\"\n                            title=\"Customize your starting moves. Start with more items, fewer items, certain items, and more.\">\n                            Customize Starting Moves\n                            <span id=\"shared_shop_warning\" data-toggle=\"tooltip\" title=\"When all moves are purchased in shops, you are extremely likely to run into fill problems if you do not start with enough shared moves! Seeds that do generate will have fill biases - consider starting with training moves.\">\n                                <svg xmlns=\"http://www.w3.org/2000/svg\" data-name=\"Layer 1\" viewBox=\"0 0 18 18\" class=\"warning-icon\" style=\"overflow: visible; margin-bottom: 7px;\" stroke=\"#ffff00\" fill=\"#ffff00\">\n                                    <path d=\"M14.876,2.672a3.309,3.309,0,0,0-5.752,0L.414,18.19a3.178,3.178,0,0,0,.029,3.189A3.264,3.264,0,0,0,3.29,23H20.71a3.264,3.264,0,0,0,2.847-1.621,3.178,3.178,0,0,0,.029-3.189ZM12,19a1,1,0,1,1,1-1A1,1,0,0,1,12,19Zm1-5a1,1,0,0,1-2,0V8a1,1,0,0,1,2,0Z\"/>\n                                </svg>\n                            </span>\n                        </button>\n                    </div>\n                </div>\n            </div>\n            <hr>\n            <h2 class=\"title\">SHUFFLED LOCATIONS</h2>\n            <div class=\"flex-container\">\n                ";
output += runtime.suppressValue((lineno = 100, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["random_patches","Random Dirt Patch Locations","Dirt Patches for Rainbow Coins are in random locations.",runtime.contextOrFrameLookup(context, frame, "False"),"Dirt Patches"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 101, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["coin_rando","Random Banana Coin Locations","Shuffle the locations of coins within each Level.",runtime.contextOrFrameLookup(context, frame, "False"),"Banana Coins"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 102, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["random_fairies","Random Banana Fairy Locations","Fairy checks are in random locations.",runtime.contextOrFrameLookup(context, frame, "False"),"Banana Fairies"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 103, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["crown_placement_rando","Random Battle Crown Pad Locations","Crown Locations are randomized. There's 1 in each level, except Isles which has two.",runtime.contextOrFrameLookup(context, frame, "False"),"Battle Crowns"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 104, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["random_crates","Random Melon Crate Locations","Melon Crate Locations are randomized.",runtime.contextOrFrameLookup(context, frame, "False"),"Melon Crates"])), env.opts.autoescape);
output += "\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Colored Banana Locations are randomized.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"cb_rando_enabled\"\n                                id=\"cb_rando_enabled\"\n                                display_name=\"Randomize CB Locations\"\n                                value=\"True\"/>\n                        Colored Bananas\n                    </label>\n                    ";
output += runtime.suppressValue((lineno = 116, colno = 36, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "cb_rando_levels"),"cb_rando_list","LEVELS","This will open a popup that will let you customize what levels have CB rando in the game.&#10;This defaults to All options.",8,1])), env.opts.autoescape);
output += "\n                ";
output += "\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Kasplats</p>\n                    <select name=\"kasplat_rando_setting\"\n                            id=\"kasplat_rando_setting\"\n                            display_name=\"Random Kasplat Locations\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Determines if and how Kasplats are randomized.&#10;-Vanilla: Kasplats are in their vanilla locations.&#10;-Vanilla Locations: Random placement of kasplats between existing spawns.&#10;-Location Shuffle: Random placement of kasplats with new and interesting locations.\">\n                        <option id=\"off\" selected value=\"off\">\n                            Vanilla\n                        </option>\n                        <option id=\"vanilla_locations\" value=\"vanilla_locations\">\n                            Vanilla Locations\n                        </option>\n                        <option id=\"location_shuffle\" value=\"location_shuffle\">\n                            Location Shuffle\n                        </option>\n                    </select>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Bananaports</p>\n                    <div class=\"d-flex\">\n                        <select name=\"bananaport_placement_rando\"\n                                id=\"bananaport_placement_rando\"\n                                display_name=\"Random Bananaport Locations\"\n                                class=\"form-select\"\n                                aria-label=\"Randomization type\"\n                                data-toggle=\"tooltip\"\n                                title=\"Shuffle the locations of bananaports within each Level.&#10;-Off: Bananaports are in their vanilla locations.&#10;-Vanilla Only: Random placement of bananaports solely within the pool of vanilla locations.&#10;-Half-Vanilla: One bananaport in each pair is vanilla, the other is in a random location.&#10;-On: Both bananaports in each pair are in a random location (with a couple exceptions for technical reasons).\">\n                            <option id=\"off\" selected value=\"off\">\n                                Off\n                            </option>\n                            <option id=\"vanilla_only\" value=\"vanilla_only\">\n                                Vanilla Only\n                            </option>\n                            <option id=\"half_vanilla\" value=\"half_vanilla\">\n                                Half-Vanilla\n                            </option>\n                            <option id=\"on\" value=\"on\">\n                                On\n                            </option>\n                        </select>\n                        <div style=\"padding: 5px;\">\n                            ";
output += runtime.suppressValue((lineno = 164, colno = 44, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "vanilla_warps"),"warp_level_list","LEVEL SELECTOR","This will open a popup that will let you customize what levels' warps are in the pool. Any level not selected will have its vanilla warp locations.&#10;This defaults to All levels.",10,1])), env.opts.autoescape);
output += "\n                        ";
output += "\n                    </div>\n                </div>\n            </div>\n            <div class=\"flex-container\" style=\"margin-top: 20px;\">\n                ";
output += runtime.suppressValue((lineno = 170, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["wrinkly_location_rando","Random Wrinkly Door Locations","Wrinkly Door Locations are randomized.",runtime.contextOrFrameLookup(context, frame, "False"),"Wrinkly Doors"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 171, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["tns_location_rando","Random Troff 'n' Scoff Portal Locations","T&S Portal Locations are randomized.",runtime.contextOrFrameLookup(context, frame, "False"),"Troff 'n' Scoff Portals"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 172, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["vanilla_door_rando","Vanilla Door Shuffle","Wrinkly Doors and T&S Portals are shuffled among the vanilla locations."])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 173, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["dos_door_rando","Dos' Doors","Vanilla Door Shuffle with some restrictions:&#10;- One T&S per level&#10;- One hint door in each lobby&#10;- DK Portal Rando enabled"])), env.opts.autoescape);
output += "\n                <div class=\"item-select\">\n                    <p class=\"select-title\">DK Portals</p>\n                    <select name=\"dk_portal_location_rando_v2\"\n                            id=\"dk_portal_location_rando_v2\"\n                            display_name=\"Random DK Portal Locations\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"DK Portal Locations are randomized.\">\n                        <option id=\"off\" selected value=\"off\">\n                            Vanilla\n                        </option>\n                        <option id=\"main_only\" value=\"main_only\" title=\"Will only place portals in the main level maps of the 7 levels\">\n                            Main Maps only\n                        </option>\n                        <option id=\"on\" value=\"on\">\n                            On\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n            <div class=\"col border panel\">\n                <h2 class=\"title\">GLOBAL</h2>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"All normal enemies that spawn in the world are randomized.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"enemy_rando\"\n                                id=\"enemy_rando\"\n                                display_name=\"Shuffle Enemies\"\n                                value=\"True\"/>\n                        Shuffle Enemies\n                    </label>\n                    ";
output += runtime.suppressValue((lineno = 210, colno = 36, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "enemies"),"enemies","ENEMIES","This will open a popup that will let you customize what enemies appear in the game.&#10;This defaults to All options.",16,1])), env.opts.autoescape);
output += "\n                ";
output += "\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Bonus Barrels are randomly chosen from the pool of available Bonus Barrels.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"bonus_barrel_rando\"\n                               id=\"bonus_barrel_rando\"\n                               display_name=\"Shuffle Bonus Barrels\"\n                               value=\"True\"/>\n                        Shuffle Bonus Barrels\n                    </label>\n                    ";
output += runtime.suppressValue((lineno = 223, colno = 36, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "minigames"),"minigames_list","MINIGAME SELECTOR","This will open a popup that will let you customize what Bonus Games are in the pool.&#10;This defaults to All minigames.",18,1])), env.opts.autoescape);
output += "\n                ";
output += "\n                ";
output += runtime.suppressValue((lineno = 225, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["enemy_speed_rando","Shuffle Enemy Speed","Enemy speeds are randomized."])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 226, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["randomize_enemy_sizes","Random Enemy Size","The size of enemies is randomized."])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 227, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["boss_location_rando","Shuffle Boss Location","The boss you can get in a level is different than normal."])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 228, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["kong_rando","Shuffle Kongs","Starting kong and kong locations have been randomized."])), env.opts.autoescape);
output += "\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"The order of KRools boxing match will randomly order the sequence.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"krool_phase_order_rando\"\n                                display_name=\"Shuffle K. Rool Phases\"\n                                value=\"True\"/>\n                        Shuffle K Rool Phases\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"The order of the Helm minigame rooms will randomly order the sequence.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"helm_phase_order_rando\"\n                                display_name=\"Shuffle Helm Rooms\"\n                                value=\"True\"/>\n                        Shuffle Helm Rooms\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"The kong you use to fight a boss is different instead of what is normally required.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"boss_kong_rando\"\n                                id=\"boss_kong_rando\"\n                                display_name=\"Shuffle Boss Kong Required\"\n                                value=\"True\"/>\n                        Shuffle Boss Kong Required\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"K. Rool phases can be found in the T&S, and T&S bosses can be encountered as an endgame phase.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"krool_in_boss_pool\"\n                                id=\"krool_in_boss_pool\"\n                                display_name=\"Shuffle Boss Kong Required\"\n                                value=\"True\"/>\n                        K Rool Phases as Bosses\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"All Replenishables in the game are randomized.&#10;*Homing Ammo, Regular Ammo, Oranges, Film, Crystals\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"randomize_pickups\"\n                                display_name=\"Randomize Pickups\"\n                                value=\"True\"/>\n                        Randomize Pickups\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Shuffle the locations of shops (including Snides) within each Level/Isles.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"shuffle_shops\"\n                                id=\"shuffle_shops\"\n                                display_name=\"Shuffle Shop Locations\"\n                                value=\"True\"/>\n                        Shuffle Shop Locations\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Randomizes the location you spawn in when starting a new file and when selecting the 'Exit to Spawn' option.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"random_starting_region\"\n                                id=\"random_starting_region\"\n                                display_name=\"Random Starting Location\"\n                                value=\"True\"/>\n                        Random Starting Location\n                    </label>\n                </div>\n                <div class=\"spacer\"></div>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Entrance Randomizer</p>\n                    <select name=\"level_randomization\"\n                            id=\"level_randomization\"\n                            display_name=\"Entrance Randomizer\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Determines how entrances are randomized and placed.&#10;-Level Order: Randomize only the order that the levels are in.&#10;-Complex Level Order: Same as 'Level Order', but the order of level entry won't be linear. Additionally, other protections that regular Level Order enforces to make it better to play will be removed.&#10;-Loading Zones: Randomize every entrance except for Helm/Helm Lobby.&#10;-Decoupled Loading Zones: Randomize every entrance except for Helm/Helm Lobby. Going back through a entrance will take you somewhere else.&#10;-Vanilla: All entrances are the same as the base game.\">\n                        <option selected value=\"level_order\">\n                            Level Order\n                        </option>\n                        <option value=\"level_order_complex\">\n                            Complex Level Order\n                        </option>\n                        <option value=\"loadingzone\">\n                            Loading Zones\n                        </option>\n                        <option value=\"loadingzonesdecoupled\">\n                            Decoupled Loading Zones\n                        </option>\n                        <option value=\"vanilla\">\n                            Vanilla\n                        </option>\n                    </select>\n                    <div class=\"form-check form-switch\" style=\"padding-top:10px;\">\n                        <label data-toggle=\"tooltip\"\n                                style=\"font-size:14px;\"\n                                title=\"Shuffle the location of Hideout Helm. If enabled, Helm and Helm Lobby will be in random locations.\">\n                            <input class=\"form-check-input\"\n                                    type=\"checkbox\"\n                                    name=\"shuffle_helm_location\"\n                                    id=\"shuffle_helm_location\"\n                                    display_name=\"Shuffle Helm Location / Include Helm\"\n                                    value=\"True\"/>\n                            <span id=\"shuffle_helm_location_label\">Shuffle Helm Location</span>\n                        </label>\n                    </div>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Random Shop Prices</p>\n                    <select name=\"random_prices\"\n                            id=\"random_prices\"\n                            display_name=\"Random Shop Prices\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"All prices in shops are randomized to a random number.&#10;-Vanilla: Same cost as base game.&#10;-Free: All moves are free.&#10;-Low: Moves cost 1-4 coins most of the time. (Avg: 2.5)&#10;-Medium: Moves cost 1-8 coins most of the time. (Avg: 4.5)&#10;-High: Moves cost 1-12 coins most of the time. (Avg: 6.5)&#10;-Extreme: Moves cost 10+ coins most of the time. (Avg: 11, starting Shockwave required!)&#10;WARNING: Extreme Prices is an enormous strain on coin logic and is VERY difficult to fill with. Only pick this if you're confident your settings give access to enough coins early.\">\n                        <option value=\"vanilla\">\n                            Vanilla\n                        </option>\n                        <option value=\"free\">\n                            Free\n                        </option>\n                        <option selected value=\"low\">\n                            Low\n                        </option>\n                        <option value=\"medium\">\n                            Medium\n                        </option>\n                        <option value=\"high\">\n                            High\n                        </option>\n                        <option id=\"extreme_price_option\" value=\"extreme\">\n                            Extreme\n                        </option>\n                    </select>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Random Puzzle Solutions</p>\n                    <select name=\"puzzle_rando_difficulty\"\n                            id=\"puzzle_rando_difficulty\"\n                            display_name=\"Random Puzzle Solutions\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Shuffles the solutions to various puzzles in the game.\">\n                        <option value=\"off\">\n                            Off\n                        </option>\n                        <option value=\"easy\">\n                            Easy\n                        </option>\n                        <option selected value=\"medium\">\n                            Medium\n                        </option>\n                        <option value=\"hard\">\n                            Hard\n                        </option>\n                        <option value=\"chaos\" title=\"Values picked can be any range between easy, medium and hard\">\n                            Chaos\n                        </option>\n                    </select>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Cross-Map Bananaports</p>\n                    <div class=\"customize-select\">\n                    <select name=\"bananaport_rando\"\n                            id=\"bananaport_rando\"\n                            display_name=\"Cross-Map Bananaports\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Random mappings of bananaport locations.\">\n                        <option id=\"off\" selected value=\"off\">\n                            Off\n                        </option>\n                        <option id=\"crossmap_coupled\" value=\"crossmap_coupled\">\n                            Coupled\n                        </option>\n                        <option id=\"crossmap_decoupled\" value=\"crossmap_decoupled\">\n                            Decoupled\n                        </option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"item-select\">\n                <p class=\"select-title\">Switchsanity</p>\n                <select name=\"switchsanity\"\n                        id=\"switchsanity\"\n                        display_name=\"Switchsanity\"\n                        class=\"form-select\"\n                        aria-label=\"Randomization type\"\n                        data-toggle=\"tooltip\"\n                        title=\"Randomizes various pads and switches in the game to other pads or switches, resulting in different requirements to access various areas.&#10;- Off: Switchsanity will be disabled.&#10;- Helm Access: Only the Isles Monkeyport pad and the Helm Lobby Gone pad will be altered.&#10;- All: All switches that can be altered will be altered.\">\n                    <option value=\"off\" selected>\n                        Off\n                    </option>\n                    <option value=\"helm_access\">\n                        Helm Access Only\n                    </option>\n                    <option value=\"all\">\n                        All\n                    </option>\n                </select>\n            </div>\n            <div class=\"spacer\"></div>\n        </div>\n        </div>\n    </div>\n</div>\n<div class=\"modal fade\"\n     id=\"starting_moves_Modal\"\n     tabindex=\"-1\"\n     aria-labelledby=\"starting_moves_ModalLabel\"\n     aria-hidden=\"true\">\n    <div class=\"modal-dialog\" style=\"max-width: 1250px;\">\n        <div class=\"modal-content modal-content-tall\">\n            <div class=\"modal-header\">\n                <h3 class=\"modal-title title\" id=\"starting_moves_ModalLabel\">CUSTOMIZE STARTING MOVES</h3>\n                <button type=\"button\"\n                        class=\"btn-close\"\n                        data-bs-dismiss=\"modal\"\n                        aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <b>Place your items into a number of item pools, then choose how many of each pool's items you want given to you at the start of the seed.</b>\n                <br/>\n                <b>To move items, select them from any list and click the item pool you want them to be in.</b>\n                <br/>\n                <em>Use the presets at the bottom as quick actions.</em>\n                <div class=\"flex-container\" style=\"justify-content: space-around; margin-top: 15px;\">\n                    <div id=\"starting_moves_list_column_1\" class=\"flex-column-container\">\n                        <b id=\"starting_moves_list_all_1\" style=\"font-style: italic; color: green;\">Start with All</b>\n                        <b id=\"starting_moves_list_some_1\" style=\"font-style: italic; color: orange;\">Start with Some</b>\n                        <b id=\"starting_moves_list_none_1\" style=\"font-style: italic; color: red;\">Start with None</b>\n                        <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_list_mover_1\">Pool 1</button>\n                        <select id=\"starting_moves_list_1\" name=\"starting_moves_list_1\" class=\"starting_moves_list multi-select\" multiple>\n                            ";
frame = frame.push();
var t_8 = runtime.contextOrFrameLookup(context, frame, "custom_starting_moves");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("item", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n                                <option id=\"starting_move_";
output += runtime.suppressValue(runtime.memberLookup((t_9),"value"), env.opts.autoescape);
output += "\" class=\"starting_moves_option\">";
output += runtime.suppressValue(runtime.memberLookup((t_9),"name"), env.opts.autoescape);
output += "</option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        </select>\n                        # Given:\n                        <input min=\"0\"\n                                max=\"47\"\n                                display_name=\"Move Count\"\n                                name=\"starting_moves_list_count_1\"\n                                id=\"starting_moves_list_count_1\"\n                                class=\"form-control center-div move_count_button\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Amount of moves given from this item pool.\"\n                                default=\"0\"\n                                placeholder=\"0\"\n                                />\n                    </div>\n                    <div id=\"starting_moves_list_column_2\" class=\"flex-column-container\">\n                        <b id=\"starting_moves_list_all_2\" style=\"font-style: italic; color: green;\">Start with All</b>\n                        <b id=\"starting_moves_list_some_2\" style=\"font-style: italic; color: orange;\">Start with Some</b>\n                        <b id=\"starting_moves_list_none_2\" style=\"font-style: italic; color: red;\">Start with None</b>\n                        <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_list_mover_2\">Pool 2</button>\n                        <select id=\"starting_moves_list_2\" name=\"starting_moves_list_2\" class=\"starting_moves_list multi-select\" multiple>\n                        </select>\n                        # Given:\n                        <input min=\"0\"\n                                max=\"47\"\n                                display_name=\"Move Count\"\n                                name=\"starting_moves_list_count_2\"\n                                id=\"starting_moves_list_count_2\"\n                                class=\"form-control center-div move_count_button\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Amount of moves given from this item pool.\"\n                                default=\"0\"\n                                placeholder=\"0\"\n                                />\n                    </div>\n                    <div id=\"starting_moves_list_column_3\" class=\"flex-column-container\">\n                        <b id=\"starting_moves_list_all_3\" style=\"font-style: italic; color: green;\">Start with All</b>\n                        <b id=\"starting_moves_list_some_3\" style=\"font-style: italic; color: orange;\">Start with Some</b>\n                        <b id=\"starting_moves_list_none_3\" style=\"font-style: italic; color: red;\">Start with None</b>\n                        <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_list_mover_3\">Pool 3</button>\n                        <select id=\"starting_moves_list_3\" name=\"starting_moves_list_3\" class=\"starting_moves_list multi-select\" multiple>\n                        </select>\n                        # Given:\n                        <input min=\"0\"\n                                max=\"47\"\n                                display_name=\"Move Count\"\n                                name=\"starting_moves_list_count_3\"\n                                id=\"starting_moves_list_count_3\"\n                                class=\"form-control center-div move_count_button\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Amount of moves given from this item pool.\"\n                                default=\"0\"\n                                placeholder=\"0\"\n                                />\n                    </div>\n                    <div id=\"starting_moves_list_column_4\" class=\"flex-column-container\">\n                        <b id=\"starting_moves_list_all_4\" style=\"font-style: italic; color: green;\">Start with All</b>\n                        <b id=\"starting_moves_list_some_4\" style=\"font-style: italic; color: orange;\">Start with Some</b>\n                        <b id=\"starting_moves_list_none_4\" style=\"font-style: italic; color: red;\">Start with None</b>\n                        <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_list_mover_4\">Pool 4</button>\n                        <select id=\"starting_moves_list_4\" name=\"starting_moves_list_4\" class=\"starting_moves_list multi-select\" multiple>\n                        </select>\n                        # Given:\n                        <input min=\"0\"\n                                max=\"47\"\n                                display_name=\"Move Count\"\n                                name=\"starting_moves_list_count_4\"\n                                id=\"starting_moves_list_count_4\"\n                                class=\"form-control center-div move_count_button\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Amount of moves given from this item pool.\"\n                                default=\"0\"\n                                placeholder=\"0\"\n                                />\n                    </div>\n                    <div id=\"starting_moves_list_column_5\" class=\"flex-column-container\">\n                        <b id=\"starting_moves_list_all_5\" style=\"font-style: italic; color: green;\">Start with All</b>\n                        <b id=\"starting_moves_list_some_5\" style=\"font-style: italic; color: orange;\">Start with Some</b>\n                        <b id=\"starting_moves_list_none_5\" style=\"font-style: italic; color: red;\">Start with None</b>\n                        <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_list_mover_5\">Pool 5</button>\n                        <select id=\"starting_moves_list_5\" name=\"starting_moves_list_5\" class=\"starting_moves_list multi-select\" multiple>\n                        </select>\n                        # Given:\n                        <input min=\"0\"\n                                max=\"47\"\n                                display_name=\"Move Count\"\n                                name=\"starting_moves_list_count_5\"\n                                id=\"starting_moves_list_count_5\"\n                                class=\"form-control center-div move_count_button\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Amount of moves given from this item pool.\"\n                                default=\"0\"\n                                placeholder=\"0\"\n                                />\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_reset\">No Item Start</button>\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_start_vanilla\">Vanilla Start</button>\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_start_all\">Start With All</button>\n                <button type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>\n<script>\n    $(function() {\n        $('[data-toggle=\"tooltip\"]').tooltip({\n            trigger: 'hover'\n        })\n    });\n</script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["settings.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"flex-container\" style=\"margin-top: 15px;\">\n    <div class=\"item-header\">\n        <h2 class=\"title\">HASH</h2>\n        <div>\n            <div id=\"hashdiv\"></div>\n            <img id=\"hash0\" style=\"transform:rotate(180deg);\">\n            <img id=\"hash1\" style=\"transform:rotate(180deg);\">\n            <img id=\"hash2\" style=\"transform:rotate(180deg);\">\n            <img id=\"hash3\" style=\"transform:rotate(180deg);\">\n            <img id=\"hash4\" style=\"transform:rotate(180deg);\">\n        </div>\n    </div>\n    <div id=\"spoiler_log_block\">\n        <h2 class=\"title\">SPOILER LOG</h2>\n        <button class=\"btn btn-secondary\"\n                type=\"button\"\n                id=\"download_spoiler_button\"\n                onClick=\"save_text_as_file(document.getElementById('spoiler_log_text').value, document.getElementById('generated_seed_id').innerHTML + '-spoilerlog.json')\">\n            Download Spoiler Log\n        </button>\n        ";
output += "\n        <button class=\"btn btn-secondary\"\n                type=\"button\"\n                id=\"download_unlocked_spoiler_button\"\n                hidden>\n            Download Spoiler Log (Unlocked)\n        </button>\n    </div>\n    <div class=\"item-header\">\n        <h2 class=\"title\">SEED ID</h2>\n        <h5 id=\"generated_seed_id\">00000</h5>\n    </div>\n</div>\n<div class=\"flex-container\" style=\"margin-top: 15px;\">\n    <div class=\"d-flex justify-content-center my-3\" style=\"width:100%\">\n        <div id=\"spoiler\" style=\"min-width: 90%; max-width: 90%\">\n            <div id=\"spoiler_log_text\"></div>\n        </div>\n    </div>\n</div>\n<div style=\"background:#ff5722; padding:8px;\" id=\"spoiler_warning_1\">\n    <h2 class=\"title\">WARNING</h2>\n    <b>It is STRONGLY recommended you save the spoiler log right now in case you run into any trouble. This is a dev site, and there is a chance you may encounter bugs that need to be reported to the devs on the Discord.</b>\n    <button class=\"btn btn-secondary\"\n            type=\"button\"\n            onClick=\"save_text_as_file(document.getElementById('spoiler_log_text').value, document.getElementById('generated_seed_id').innerHTML + '-spoilerlog.json')\">\n        <b>Download Spoiler Log</b>\n    </button>\n</div>\n<div style=\"background:#f40b0b; padding:8px;\" id=\"patch_version_warning\" hidden>\n    <h2 class=\"title\">WARNING</h2>\n    <b id=\"patch_warning_message\">This patch file is from a different version.</b>\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["spoiler.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var t_1;
t_1 = ["Settings","Spoiler Hints Data","Generated Time","Selected Minigames","Item Pool","Enemy Placement (Stringified JSON)"];
frame.set("ignored_attrs", t_1, true);
if(frame.topLevel) {
context.setVariable("ignored_attrs", t_1);
}
if(frame.topLevel) {
context.addExport("ignored_attrs", t_1);
}
output += "\n<div class=\"accordion\">\n    <div class=\"accordion-item\">\n        <h2 class=\"accordion-header collapsed\"\n                id=\"spoilerhead-master\">\n            ";
output += "\n            <button class=\"accordion-button collapsed\" type=\"button\"\n                data-bs-toggle=\"collapse\"\n                data-bs-target=\"#spoileritem-master\"\n                aria-expanded=\"false\"\n                aria-controls=\"spoileritem-master\">\n                ";
if(runtime.inOperator("Generated Time",runtime.contextOrFrameLookup(context, frame, "spoiler"))) {
output += "\n                    Spoiler Log (Generated: ";
output += runtime.suppressValue(env.getFilter("timeconvert").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),"Generated Time")), env.opts.autoescape);
output += ")\n                ";
;
}
else {
output += "\n                    Spoiler Log\n                ";
;
}
output += "\n            </button>\n        </h2>\n        <div class=\"spoiler-item collapse\" id=\"spoileritem-master\">\n            ";
output += "\n            <nav class=\"navbar\">\n                <div class=\"container\">\n                    <div class=\"nav nav-underline\" id=\"spoiler-nav-group\">\n                        ";
frame = frame.push();
var t_4 = runtime.contextOrFrameLookup(context, frame, "spoiler");
if(t_4) {t_4 = runtime.fromIterator(t_4);
var t_3 = t_4.length;
for(var t_2=0; t_2 < t_4.length; t_2++) {
var t_5 = t_4[t_2];
frame.set("item", t_5);
frame.set("loop.index", t_2 + 1);
frame.set("loop.index0", t_2);
frame.set("loop.revindex", t_3 - t_2);
frame.set("loop.revindex0", t_3 - t_2 - 1);
frame.set("loop.first", t_2 === 0);
frame.set("loop.last", t_2 === t_3 - 1);
frame.set("loop.length", t_3);
output += "\n                            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_5) != {} && !runtime.inOperator(t_5,runtime.contextOrFrameLookup(context, frame, "ignored_attrs"))) {
output += "\n                                <li class=\"nav-item\">\n                                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == "0") {
output += "\n                                        <a class=\"nav-link active\" data-bs-toggle=\"tab\" data-bs-target=\"#spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\" href=\"#\" onclick=\"updateFilteredSpoilerTabs()\">";
output += runtime.suppressValue(t_5, env.opts.autoescape);
output += "</a>\n                                    ";
;
}
else {
output += "\n                                        <a class=\"nav-link\" data-bs-toggle=\"tab\" data-bs-target=\"#spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\" href=\"#\" onclick=\"updateFilteredSpoilerTabs()\">";
output += runtime.suppressValue(t_5, env.opts.autoescape);
output += "</a>\n                                    ";
;
}
output += "\n                                </li>\n                            ";
;
}
output += "\n                        ";
;
}
}
frame = frame.pop();
output += "\n                    </div>\n                </div>\n            </nav>\n            ";
output += "\n            <div class=\"row\">\n                <div class=\"col-md-5 m-3 text-start\">\n                    <div class=\"small fw-light\">Filter Spoiler Log</div>\n                    <div class=\"input-group\">\n                        <input class=\"form-control border\" type=\"search\" value=\"\" id=\"spoilerFilterSearch\" onkeyup=\"filterSpoilerSearch(this)\" onclick=\"setTimeout(() => {filterSpoilerSearch(this)}, 10)\">\n                    </div>\n                </div>\n            </div>\n            ";
output += "\n            <div class=\"tab-content\">\n                ";
frame = frame.push();
var t_8 = runtime.contextOrFrameLookup(context, frame, "spoiler");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("item", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9) != {} && !runtime.inOperator(t_9,runtime.contextOrFrameLookup(context, frame, "ignored_attrs"))) {
output += "\n                        ";
var t_10;
t_10 = "";
frame.set("tab_cls", t_10, true);
if(frame.topLevel) {
context.setVariable("tab_cls", t_10);
}
if(frame.topLevel) {
context.addExport("tab_cls", t_10);
}
output += "\n                        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == "0") {
output += "\n                            ";
var t_11;
t_11 = " show active";
frame.set("tab_cls", t_11, true);
if(frame.topLevel) {
context.setVariable("tab_cls", t_11);
}
if(frame.topLevel) {
context.addExport("tab_cls", t_11);
}
output += "\n                        ";
;
}
output += "\n                        <div class=\"tab-pane fade";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tab_cls"), env.opts.autoescape);
output += "\" id=\"spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\">\n                            <div class=\"container mt-4\">\n                                ";
if(env.getTest("mapping").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)) === true) {
output += "\n                                    ";
if(t_9 == "Playthrough") {
output += "\n                                        ";
frame = frame.push();
var t_14 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9);
if(t_14) {t_14 = runtime.fromIterator(t_14);
var t_13 = t_14.length;
for(var t_12=0; t_12 < t_14.length; t_12++) {
var t_15 = t_14[t_12];
frame.set("sphere_index", t_15);
frame.set("loop.index", t_12 + 1);
frame.set("loop.index0", t_12);
frame.set("loop.revindex", t_13 - t_12);
frame.set("loop.revindex0", t_13 - t_12 - 1);
frame.set("loop.first", t_12 === 0);
frame.set("loop.last", t_12 === t_13 - 1);
frame.set("loop.length", t_13);
output += "\n                                            <div class=\"spoiler-group\">\n                                                <h4 class=\"mt-5\">\n                                                    Sphere ";
output += runtime.suppressValue(t_15, env.opts.autoescape);
output += "\n                                                </h4>\n                                                <div class=\"small fw-light text-start ps-2 pb-2\">\n                                                    ";
if(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_15)),"Available GBs") != 1) {
output += "\n                                                        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_15)),"Available GBs"), env.opts.autoescape);
output += " GBs available\n                                                    ";
;
}
else {
output += "\n                                                        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_15)),"Available GBs"), env.opts.autoescape);
output += " GB available\n                                                    ";
;
}
output += "\n                                                </div>\n                                                <table class=\"table table-hover table-striped table-dark ignore-width\" style=\"min-width:100%; text-align: left\">\n                                                    <tbody>\n                                                        ";
frame = frame.push();
var t_18 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_15);
if(t_18) {t_18 = runtime.fromIterator(t_18);
var t_17 = t_18.length;
for(var t_16=0; t_16 < t_18.length; t_16++) {
var t_19 = t_18[t_16];
frame.set("item2", t_19);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
output += "\n                                                            ";
if(t_19 != "Available GBs") {
output += "\n                                                                <tr>\n                                                                    <td>";
output += runtime.suppressValue(t_19, env.opts.autoescape);
output += "</td>\n                                                                    ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_15)),t_19)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_15)),t_19)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_15)),t_19)) === true)) {
output += "\n                                                                        <td>";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_15)),t_19),", "), env.opts.autoescape);
output += "</td>\n                                                                    ";
;
}
else {
output += "\n                                                                        <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_15)),t_19), env.opts.autoescape);
output += "</td>\n                                                                    ";
;
}
output += "\n                                                                </tr>\n                                                            ";
;
}
output += "\n                                                        ";
;
}
}
frame = frame.pop();
output += "\n                                                    </tbody>\n                                                </table>\n                                            </div>\n                                        ";
;
}
}
frame = frame.pop();
output += "\n                                    ";
;
}
else {
if(runtime.inOperator(t_9,("Cosmetics","Requirements","Bosses","Items","Items (Sorted by Item)","Shuffled Exits (Sorted by destination)","Colored Banana Locations","Wrinkly Door Locations","T&S Portal Locations","Enemy Placement","Paths","WotH Paths","Other Paths","End Game","Hints","Misc Custom Locations"))) {
output += "\n                                        ";
output += "\n                                        ";
frame = frame.push();
var t_22 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9);
if(t_22) {t_22 = runtime.fromIterator(t_22);
var t_21 = t_22.length;
for(var t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20];
frame.set("sub_group", t_23);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
output += "\n                                            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_23) != {}) {
output += "\n                                                <div class=\"spoiler-group\">\n                                                    <h4 class=\"mt-5\">";
output += runtime.suppressValue(t_23, env.opts.autoescape);
output += "</h4>\n                                                    <table class=\"table table-hover table-striped table-dark ignore-width\" style=\"min-width:100%; text-align: left\">\n                                                        <tbody>\n                                                            ";
frame = frame.push();
var t_26 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_23);
if(t_26) {t_26 = runtime.fromIterator(t_26);
var t_25 = t_26.length;
for(var t_24=0; t_24 < t_26.length; t_24++) {
var t_27 = t_26[t_24];
frame.set("item2", t_27);
frame.set("loop.index", t_24 + 1);
frame.set("loop.index0", t_24);
frame.set("loop.revindex", t_25 - t_24);
frame.set("loop.revindex0", t_25 - t_24 - 1);
frame.set("loop.first", t_24 === 0);
frame.set("loop.last", t_24 === t_25 - 1);
frame.set("loop.length", t_25);
output += "\n                                                                ";
if(t_9 != "Hints" || t_23 != "Wrinkly Hints" || t_27 != "First Time Talk") {
output += "\n                                                                    <tr>\n                                                                        ";
if(runtime.inOperator(t_9,("Items","Items (Sorted by Item)"))) {
output += "\n                                                                            ";
if(t_27 == "Diddy Kong") {
output += "\n                                                                                <td>Japes Kong</td>\n                                                                            ";
;
}
else {
if(t_27 == "Lanky Kong") {
output += "\n                                                                                <td>Llama Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_27 == "Tiny Kong") {
output += "\n                                                                                <td>Tiny Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_27 == "Chunky Kong") {
output += "\n                                                                                <td>Factory Kong</td>\n                                                                            ";
;
}
else {
output += "\n                                                                                <td>";
output += runtime.suppressValue(t_27, env.opts.autoescape);
output += "</td>\n                                                                            ";
;
}
;
}
;
}
;
}
output += "\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(t_27, env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                        ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_23)),t_27)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_23)),t_27)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_23)),t_27)) === true)) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_23)),t_27),"<br>"), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_23)),t_27), env.opts.autoescape);
output += "\n                                                                                ";
if(t_9 == "Cosmetics" && t_23 == "Colors" && runtime.inOperator("Color",t_27)) {
output += "\n                                                                                    <span class=\"color-demo-box\"\n                                                                                        style=\"background-color:";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_23)),t_27), env.opts.autoescape);
output += "\">&nbsp;</span>\n                                                                                ";
;
}
output += "\n                                                                            </td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
output += "\n                                                            ";
;
}
}
frame = frame.pop();
output += "\n                                                        </tbody>\n                                                    </table>\n                                                </div>\n                                            ";
;
}
output += "\n                                        ";
;
}
}
frame = frame.pop();
output += "\n                                    ";
;
}
else {
output += "\n                                        <div class=\"spoiler-group\">\n                                            <table class=\"table table-hover table-striped table-dark ignore-width\" style=\"min-width:100%; text-align: left\">\n                                                <tbody>\n                                                    ";
frame = frame.push();
var t_30 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9);
if(t_30) {t_30 = runtime.fromIterator(t_30);
var t_29 = t_30.length;
for(var t_28=0; t_28 < t_30.length; t_28++) {
var t_31 = t_30[t_28];
frame.set("item2", t_31);
frame.set("loop.index", t_28 + 1);
frame.set("loop.index0", t_28);
frame.set("loop.revindex", t_29 - t_28);
frame.set("loop.revindex0", t_29 - t_28 - 1);
frame.set("loop.first", t_28 === 0);
frame.set("loop.last", t_28 === t_29 - 1);
frame.set("loop.length", t_29);
output += "\n                                                        <tr>\n                                                            <td>";
output += runtime.suppressValue(t_31, env.opts.autoescape);
output += "</td>\n                                                            ";
if(t_9 == "Shuffled Exits") {
output += "\n                                                                ";
if(runtime.contextOrFrameLookup(context, frame, "lzr_type") == "coupled") {
output += "\n                                                                    <td class=\"directional_divider\">↔</td>\n                                                                ";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "lzr_type") == "decoupled") {
output += "\n                                                                    <td class=\"directional_divider\">→</td>\n                                                                ";
;
}
;
}
output += "\n                                                            ";
;
}
output += "\n                                                            ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_31)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_31)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_31)) === true)) {
output += "\n                                                                <td>";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_31),"<br>"), env.opts.autoescape);
output += "</td>\n                                                            ";
;
}
else {
output += "\n                                                                <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)),t_31), env.opts.autoescape);
output += "</td>\n                                                            ";
;
}
output += "\n                                                        </tr>\n                                                    ";
;
}
}
frame = frame.pop();
output += "\n                                                </tbody>\n                                            </table>\n                                        </div>\n                                    ";
;
}
;
}
output += "\n                                ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9) == "True" || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9) == "False") {
output += "\n                                    <div class=\"spoiler-group\">\n                                        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9), env.opts.autoescape);
output += "\n                                    </div>\n                                ";
;
}
else {
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9)) === true)) {
output += "\n                                    <div class=\"spoiler-group\">\n                                        <table class=\"table table-hover table-striped table-dark ignore-width\" style=\"min-width:100%; text-align: left\">\n                                            <tbody>\n                                                ";
frame = frame.push();
var t_34 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9);
if(t_34) {t_34 = runtime.fromIterator(t_34);
var t_33 = t_34.length;
for(var t_32=0; t_32 < t_34.length; t_32++) {
var t_35 = t_34[t_32];
frame.set("item2", t_35);
frame.set("loop.index", t_32 + 1);
frame.set("loop.index0", t_32);
frame.set("loop.revindex", t_33 - t_32);
frame.set("loop.revindex0", t_33 - t_32 - 1);
frame.set("loop.first", t_32 === 0);
frame.set("loop.last", t_32 === t_33 - 1);
frame.set("loop.length", t_33);
output += "\n                                                    <tr>\n                                                        <td>";
output += runtime.suppressValue(t_35, env.opts.autoescape);
output += "</td>\n                                                    </tr>\n                                                ";
;
}
}
frame = frame.pop();
output += "\n                                            </tbody>\n                                        </table>\n                                    </div>\n                                ";
;
}
else {
output += "\n                                    <div class=\"spoiler-group\">\n                                        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_9), env.opts.autoescape);
output += "\n                                    </div>\n                                ";
;
}
;
}
;
}
output += "\n                            </div>\n                        </div>\n                    ";
;
}
output += "\n                ";
;
}
}
frame = frame.pop();
output += "\n            </div>\n        </div>\n    </div>\n    ";
if(runtime.inOperator("Settings",runtime.contextOrFrameLookup(context, frame, "spoiler"))) {
output += "\n        <div class=\"accordion-item\">\n            <h2 class=\"accordion-header collapsed\"\n                    id=\"spoilerhead-settings\">\n                ";
output += "\n                <button class=\"accordion-button collapsed\" type=\"button\"\n                    data-bs-toggle=\"collapse\"\n                    data-bs-target=\"#spoileritem-settings\"\n                    aria-expanded=\"false\"\n                    aria-controls=\"spoileritem-settings\">\n                    Settings\n                </button>\n            </h2>\n            <div class=\"spoiler-item collapse\" id=\"spoileritem-settings\">\n                <div class=\"p-4 text-start\">\n                    <div class=\"fw-bold\">\n                        Settings String\n                    </div>\n                    <div class=\"fs-6 fw-light p-2 rounded\" style=\"background-color: rgba(0, 0, 0, 0.3)\">\n                        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),"Settings")),"Settings String"), env.opts.autoescape);
output += "\n                    </div>\n                </div>\n                <table class=\"table table-hover table-striped table-dark ignore-width\" style=\"min-width:100%; text-align: left\">\n                    <thead>\n                        <tr>\n                            <th>Property</th>\n                            <th>Value</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        ";
frame = frame.push();
var t_38 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),"Settings");
if(t_38) {t_38 = runtime.fromIterator(t_38);
var t_37 = t_38.length;
for(var t_36=0; t_36 < t_38.length; t_36++) {
var t_39 = t_38[t_36];
frame.set("item", t_39);
frame.set("loop.index", t_36 + 1);
frame.set("loop.index0", t_36);
frame.set("loop.revindex", t_37 - t_36);
frame.set("loop.revindex0", t_37 - t_36 - 1);
frame.set("loop.first", t_36 === 0);
frame.set("loop.last", t_36 === t_37 - 1);
frame.set("loop.length", t_37);
output += "\n                            ";
if(!runtime.inOperator(t_39,("Generation Timestamp","Settings String","Seed","algorithm","Unlock Time"))) {
output += "\n                                <tr>\n                                    <td>";
output += runtime.suppressValue(t_39, env.opts.autoescape);
output += "</td>\n                                    <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),"Settings")),t_39), env.opts.autoescape);
output += "</td>\n                                </tr>\n                            ";
;
}
output += "\n                        ";
;
}
}
frame = frame.pop();
output += "\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    ";
;
}
output += "\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["spoiler_new.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var t_1;
t_1 = ["Settings","Spoiler Hints Data","Generated Time","Generation Branch","Selected Minigames","Item Pool","Enemy Placement (Stringified JSON)"];
frame.set("ignored_attrs", t_1, true);
if(frame.topLevel) {
context.setVariable("ignored_attrs", t_1);
}
if(frame.topLevel) {
context.addExport("ignored_attrs", t_1);
}
output += "\n<div class=\"accordion\">\n    <div class=\"accordion-item\">\n        <h2 class=\"accordion-header collapsed\"\n                id=\"spoilerhead-master\">\n            ";
output += "\n            <button class=\"accordion-button collapsed\" type=\"button\"\n                data-bs-toggle=\"collapse\"\n                data-bs-target=\"#spoileritem-master\"\n                aria-expanded=\"false\"\n                aria-controls=\"spoileritem-master\">\n                ";
if(runtime.inOperator("Generated Time",runtime.contextOrFrameLookup(context, frame, "spoiler"))) {
output += "\n                    Spoiler Log (Generated: ";
output += runtime.suppressValue(env.getFilter("timeconvert").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),"Generated Time")), env.opts.autoescape);
output += ")\n                ";
;
}
else {
output += "\n                    Spoiler Log\n                ";
;
}
output += "\n            </button>\n        </h2>\n        <div class=\"spoiler-item collapse\" id=\"spoileritem-master\">\n            ";
output += "\n            <nav class=\"navbar\">\n                <div class=\"container\">\n                    <div class=\"nav nav-underline\" id=\"spoiler-nav-group\">\n                        ";
frame = frame.push();
var t_4 = runtime.contextOrFrameLookup(context, frame, "spoiler");
if(t_4) {t_4 = runtime.fromIterator(t_4);
var t_2;
if(runtime.isArray(t_4)) {
var t_3 = t_4.length;
for(t_2=0; t_2 < t_4.length; t_2++) {
var t_5 = t_4[t_2][0];
frame.set("[object Object]", t_4[t_2][0]);
var t_6 = t_4[t_2][1];
frame.set("[object Object]", t_4[t_2][1]);
frame.set("loop.index", t_2 + 1);
frame.set("loop.index0", t_2);
frame.set("loop.revindex", t_3 - t_2);
frame.set("loop.revindex0", t_3 - t_2 - 1);
frame.set("loop.first", t_2 === 0);
frame.set("loop.last", t_2 === t_3 - 1);
frame.set("loop.length", t_3);
output += "\n                            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_5) != {} && !runtime.inOperator(t_5,runtime.contextOrFrameLookup(context, frame, "ignored_attrs"))) {
output += "\n                                <li class=\"nav-item\">\n                                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == "0") {
output += "\n                                        <a class=\"nav-link active\" data-bs-toggle=\"tab\" data-bs-target=\"#spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\" href=\"#\" onclick=\"updateFilteredSpoilerTabs()\" id=\"spoilerTab";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(t_5, env.opts.autoescape);
output += "</a>\n                                    ";
;
}
else {
output += "\n                                        <a class=\"nav-link\" data-bs-toggle=\"tab\" data-bs-target=\"#spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\" href=\"#\" onclick=\"updateFilteredSpoilerTabs()\" id=\"spoilerTab";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(t_5, env.opts.autoescape);
output += "</a>\n                                    ";
;
}
output += "\n                                </li>\n                            ";
;
}
output += "\n                        ";
;
}
} else {
t_2 = -1;
var t_3 = runtime.keys(t_4).length;
for(var t_7 in t_4) {
t_2++;
var t_8 = t_4[t_7];
frame.set("item", t_7);
frame.set("obj", t_8);
frame.set("loop.index", t_2 + 1);
frame.set("loop.index0", t_2);
frame.set("loop.revindex", t_3 - t_2);
frame.set("loop.revindex0", t_3 - t_2 - 1);
frame.set("loop.first", t_2 === 0);
frame.set("loop.last", t_2 === t_3 - 1);
frame.set("loop.length", t_3);
output += "\n                            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_7) != {} && !runtime.inOperator(t_7,runtime.contextOrFrameLookup(context, frame, "ignored_attrs"))) {
output += "\n                                <li class=\"nav-item\">\n                                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == "0") {
output += "\n                                        <a class=\"nav-link active\" data-bs-toggle=\"tab\" data-bs-target=\"#spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\" href=\"#\" onclick=\"updateFilteredSpoilerTabs()\" id=\"spoilerTab";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(t_7, env.opts.autoescape);
output += "</a>\n                                    ";
;
}
else {
output += "\n                                        <a class=\"nav-link\" data-bs-toggle=\"tab\" data-bs-target=\"#spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\" href=\"#\" onclick=\"updateFilteredSpoilerTabs()\" id=\"spoilerTab";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(t_7, env.opts.autoescape);
output += "</a>\n                                    ";
;
}
output += "\n                                </li>\n                            ";
;
}
output += "\n                        ";
;
}
}
}
frame = frame.pop();
output += "\n                    </div>\n                </div>\n            </nav>\n            ";
output += "\n            <div class=\"row\">\n                <div class=\"col-md-5 m-3 text-start\">\n                    <div class=\"small fw-light\">Filter Spoiler Log</div>\n                    <div class=\"input-group\">\n                        <input class=\"form-control border\" type=\"search\" value=\"\" id=\"spoilerFilterSearch\" onkeyup=\"filterSpoilerSearch(this)\" onclick=\"setTimeout(() => {filterSpoilerSearch(this)}, 10)\">\n                    </div>\n                </div>\n            </div>\n            ";
output += "\n            <div class=\"tab-content pb-2\">\n                ";
frame = frame.push();
var t_11 = runtime.contextOrFrameLookup(context, frame, "spoiler");
if(t_11) {t_11 = runtime.fromIterator(t_11);
var t_9;
if(runtime.isArray(t_11)) {
var t_10 = t_11.length;
for(t_9=0; t_9 < t_11.length; t_9++) {
var t_12 = t_11[t_9][0];
frame.set("[object Object]", t_11[t_9][0]);
var t_13 = t_11[t_9][1];
frame.set("[object Object]", t_11[t_9][1]);
frame.set("loop.index", t_9 + 1);
frame.set("loop.index0", t_9);
frame.set("loop.revindex", t_10 - t_9);
frame.set("loop.revindex0", t_10 - t_9 - 1);
frame.set("loop.first", t_9 === 0);
frame.set("loop.last", t_9 === t_10 - 1);
frame.set("loop.length", t_10);
output += "\n                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12) != {} && !runtime.inOperator(t_12,runtime.contextOrFrameLookup(context, frame, "ignored_attrs"))) {
output += "\n                        ";
var t_14;
t_14 = "";
frame.set("tab_cls", t_14, true);
if(frame.topLevel) {
context.setVariable("tab_cls", t_14);
}
if(frame.topLevel) {
context.addExport("tab_cls", t_14);
}
output += "\n                        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == "0") {
output += "\n                            ";
var t_15;
t_15 = " show active";
frame.set("tab_cls", t_15, true);
if(frame.topLevel) {
context.setVariable("tab_cls", t_15);
}
if(frame.topLevel) {
context.addExport("tab_cls", t_15);
}
output += "\n                        ";
;
}
output += "\n                        <div class=\"tab-pane fade";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tab_cls"), env.opts.autoescape);
output += "\" id=\"spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\">\n                            <div class=\"container mt-4\">\n                                ";
if(env.getTest("mapping").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)) === true) {
output += "\n                                    ";
if(t_12 == "Way of the Hoard") {
output += "\n                                        <div class=\"p-2 text-start border\">\n                                            ";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)), env.opts.autoescape);
output += " Items are on the Way of the Hoard\n                                        </div>\n                                    ";
;
}
output += "\n                                    ";
if(t_12 == "Playthrough") {
output += "\n                                        ";
frame = frame.push();
var t_18 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12);
if(t_18) {t_18 = runtime.fromIterator(t_18);
var t_16;
if(runtime.isArray(t_18)) {
var t_17 = t_18.length;
for(t_16=0; t_16 < t_18.length; t_16++) {
var t_19 = t_18[t_16][0];
frame.set("[object Object]", t_18[t_16][0]);
var t_20 = t_18[t_16][1];
frame.set("[object Object]", t_18[t_16][1]);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
output += "\n                                            <div class=\"spoiler-group\">\n                                                <div class=\"spoiler-subsection-head d-flex collapsed\"\n                                                    data-bs-toggle=\"collapse\"\n                                                    data-bs-target=\"#spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(t_19, env.opts.autoescape);
output += "\"\n                                                    aria-expanded=\"false\"\n                                                    aria-controls=\"spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(t_19, env.opts.autoescape);
output += "\">\n                                                    <div class=\"flex-fill\">\n                                                        <h4>\n                                                            Sphere ";
output += runtime.suppressValue(t_19, env.opts.autoescape);
output += "\n                                                        </h4>\n                                                        <div class=\"small fw-light text-start ps-2 pb-2\">\n                                                            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_19)),"Available GBs") != 1) {
output += "\n                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_19)),"Available GBs"), env.opts.autoescape);
output += " GBs available\n                                                            ";
;
}
else {
output += "\n                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_19)),"Available GBs"), env.opts.autoescape);
output += " GB available\n                                                            ";
;
}
output += "\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"text-end small fw-light p-2 pe-4 position-relative\">\n                                                        <div class=\"position-absolute top-50 start-0 translate-middle spoiler-subsection-expand\"></div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"collapse mb-5\" id=\"spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(t_19, env.opts.autoescape);
output += "\">\n                                                    <table class=\"table table-hover table-striped ignore-width\" style=\"min-width:100%; text-align: left\">\n                                                        <tbody>\n                                                            ";
frame = frame.push();
var t_23 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_19);
if(t_23) {t_23 = runtime.fromIterator(t_23);
var t_21;
if(runtime.isArray(t_23)) {
var t_22 = t_23.length;
for(t_21=0; t_21 < t_23.length; t_21++) {
var t_24 = t_23[t_21][0];
frame.set("[object Object]", t_23[t_21][0]);
var t_25 = t_23[t_21][1];
frame.set("[object Object]", t_23[t_21][1]);
frame.set("loop.index", t_21 + 1);
frame.set("loop.index0", t_21);
frame.set("loop.revindex", t_22 - t_21);
frame.set("loop.revindex0", t_22 - t_21 - 1);
frame.set("loop.first", t_21 === 0);
frame.set("loop.last", t_21 === t_22 - 1);
frame.set("loop.length", t_22);
output += "\n                                                                ";
if(t_24 != "Available GBs") {
output += "\n                                                                    <tr>\n                                                                        <td>";
output += runtime.suppressValue(t_24, env.opts.autoescape);
output += "</td>\n                                                                        ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_19)),t_24)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_19)),t_24)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_19)),t_24)) === true)) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_19)),t_24),", "), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_19)),t_24), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
output += "\n                                                            ";
;
}
} else {
t_21 = -1;
var t_22 = runtime.keys(t_23).length;
for(var t_26 in t_23) {
t_21++;
var t_27 = t_23[t_26];
frame.set("item2", t_26);
frame.set("obj", t_27);
frame.set("loop.index", t_21 + 1);
frame.set("loop.index0", t_21);
frame.set("loop.revindex", t_22 - t_21);
frame.set("loop.revindex0", t_22 - t_21 - 1);
frame.set("loop.first", t_21 === 0);
frame.set("loop.last", t_21 === t_22 - 1);
frame.set("loop.length", t_22);
output += "\n                                                                ";
if(t_26 != "Available GBs") {
output += "\n                                                                    <tr>\n                                                                        <td>";
output += runtime.suppressValue(t_26, env.opts.autoescape);
output += "</td>\n                                                                        ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_19)),t_26)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_19)),t_26)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_19)),t_26)) === true)) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_19)),t_26),", "), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_19)),t_26), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
output += "\n                                                            ";
;
}
}
}
frame = frame.pop();
output += "\n                                                        </tbody>\n                                                    </table>\n                                                </div>\n                                            </div>\n                                        ";
;
}
} else {
t_16 = -1;
var t_17 = runtime.keys(t_18).length;
for(var t_28 in t_18) {
t_16++;
var t_29 = t_18[t_28];
frame.set("sphere_index", t_28);
frame.set("obj", t_29);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
output += "\n                                            <div class=\"spoiler-group\">\n                                                <div class=\"spoiler-subsection-head d-flex collapsed\"\n                                                    data-bs-toggle=\"collapse\"\n                                                    data-bs-target=\"#spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(t_28, env.opts.autoescape);
output += "\"\n                                                    aria-expanded=\"false\"\n                                                    aria-controls=\"spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(t_28, env.opts.autoescape);
output += "\">\n                                                    <div class=\"flex-fill\">\n                                                        <h4>\n                                                            Sphere ";
output += runtime.suppressValue(t_28, env.opts.autoescape);
output += "\n                                                        </h4>\n                                                        <div class=\"small fw-light text-start ps-2 pb-2\">\n                                                            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_28)),"Available GBs") != 1) {
output += "\n                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_28)),"Available GBs"), env.opts.autoescape);
output += " GBs available\n                                                            ";
;
}
else {
output += "\n                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_28)),"Available GBs"), env.opts.autoescape);
output += " GB available\n                                                            ";
;
}
output += "\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"text-end small fw-light p-2 pe-4 position-relative\">\n                                                        <div class=\"position-absolute top-50 start-0 translate-middle spoiler-subsection-expand\"></div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"collapse mb-5\" id=\"spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(t_28, env.opts.autoescape);
output += "\">\n                                                    <table class=\"table table-hover table-striped ignore-width\" style=\"min-width:100%; text-align: left\">\n                                                        <tbody>\n                                                            ";
frame = frame.push();
var t_32 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_28);
if(t_32) {t_32 = runtime.fromIterator(t_32);
var t_30;
if(runtime.isArray(t_32)) {
var t_31 = t_32.length;
for(t_30=0; t_30 < t_32.length; t_30++) {
var t_33 = t_32[t_30][0];
frame.set("[object Object]", t_32[t_30][0]);
var t_34 = t_32[t_30][1];
frame.set("[object Object]", t_32[t_30][1]);
frame.set("loop.index", t_30 + 1);
frame.set("loop.index0", t_30);
frame.set("loop.revindex", t_31 - t_30);
frame.set("loop.revindex0", t_31 - t_30 - 1);
frame.set("loop.first", t_30 === 0);
frame.set("loop.last", t_30 === t_31 - 1);
frame.set("loop.length", t_31);
output += "\n                                                                ";
if(t_33 != "Available GBs") {
output += "\n                                                                    <tr>\n                                                                        <td>";
output += runtime.suppressValue(t_33, env.opts.autoescape);
output += "</td>\n                                                                        ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_28)),t_33)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_28)),t_33)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_28)),t_33)) === true)) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_28)),t_33),", "), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_28)),t_33), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
output += "\n                                                            ";
;
}
} else {
t_30 = -1;
var t_31 = runtime.keys(t_32).length;
for(var t_35 in t_32) {
t_30++;
var t_36 = t_32[t_35];
frame.set("item2", t_35);
frame.set("obj", t_36);
frame.set("loop.index", t_30 + 1);
frame.set("loop.index0", t_30);
frame.set("loop.revindex", t_31 - t_30);
frame.set("loop.revindex0", t_31 - t_30 - 1);
frame.set("loop.first", t_30 === 0);
frame.set("loop.last", t_30 === t_31 - 1);
frame.set("loop.length", t_31);
output += "\n                                                                ";
if(t_35 != "Available GBs") {
output += "\n                                                                    <tr>\n                                                                        <td>";
output += runtime.suppressValue(t_35, env.opts.autoescape);
output += "</td>\n                                                                        ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_28)),t_35)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_28)),t_35)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_28)),t_35)) === true)) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_28)),t_35),", "), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_28)),t_35), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
output += "\n                                                            ";
;
}
}
}
frame = frame.pop();
output += "\n                                                        </tbody>\n                                                    </table>\n                                                </div>\n                                            </div>\n                                        ";
;
}
}
}
frame = frame.pop();
output += "\n                                    ";
;
}
else {
if(t_12 == "Cosmetics" || t_12 == "Requirements" || t_12 == "Bosses" || t_12 == "Items" || t_12 == "Items (Sorted by Item)" || t_12 == "Shuffled Exits (Sorted by destination)" || t_12 == "Colored Banana Locations" || t_12 == "Wrinkly Door Locations" || t_12 == "Shuffled Bananaport Locations" || t_12 == "T&S Portal Locations" || t_12 == "Enemy Placement" || t_12 == "Paths" || t_12 == "WotH Paths" || t_12 == "Other Paths" || t_12 == "End Game" || t_12 == "Hints" || t_12 == "Misc Custom Locations") {
output += "\n                                    ";
output += "\n                                        ";
var t_37;
t_37 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index");
frame.set("local_loop", t_37, true);
if(frame.topLevel) {
context.setVariable("local_loop", t_37);
}
if(frame.topLevel) {
context.addExport("local_loop", t_37);
}
output += "\n                                        ";
frame = frame.push();
var t_40 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12);
if(t_40) {t_40 = runtime.fromIterator(t_40);
var t_38;
if(runtime.isArray(t_40)) {
var t_39 = t_40.length;
for(t_38=0; t_38 < t_40.length; t_38++) {
var t_41 = t_40[t_38][0];
frame.set("[object Object]", t_40[t_38][0]);
var t_42 = t_40[t_38][1];
frame.set("[object Object]", t_40[t_38][1]);
frame.set("loop.index", t_38 + 1);
frame.set("loop.index0", t_38);
frame.set("loop.revindex", t_39 - t_38);
frame.set("loop.revindex0", t_39 - t_38 - 1);
frame.set("loop.first", t_38 === 0);
frame.set("loop.last", t_38 === t_39 - 1);
frame.set("loop.length", t_39);
output += "\n                                            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41) != {}) {
output += "\n                                                <div class=\"spoiler-group\">\n                                                    <div class=\"spoiler-subsection-head d-flex collapsed\"\n                                                    id=\"spoilerDropdown";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_41), env.opts.autoescape);
output += "\"\n                                                    data-bs-toggle=\"collapse\"\n                                                    data-bs-target=\"#spoilerContent";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_41), env.opts.autoescape);
output += "\"\n                                                    aria-expanded=\"false\"\n                                                    aria-controls=\"spoilerContent";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_41), env.opts.autoescape);
output += "\">\n                                                        <div class=\"flex-fill\">\n                                                            <h4>";
output += runtime.suppressValue(t_41, env.opts.autoescape);
output += "</h4>\n                                                            <div class=\"small fw-light text-start ps-2 pb-2\">\n                                                                ";
if(env.getFilter("length").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41)) == 1) {
output += "\n                                                                    1 Item\n                                                                ";
;
}
else {
output += "\n                                                                    ";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41)), env.opts.autoescape);
output += " Items\n                                                                ";
;
}
output += "\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"text-end small fw-light p-2 pe-4 position-relative\">\n                                                            <div class=\"position-absolute top-50 start-0 translate-middle spoiler-subsection-expand\"></div>\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"collapse mb-5\" id=\"spoilerContent";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_41), env.opts.autoescape);
output += "\">\n                                                        <table class=\"table table-hover table-striped ignore-width\" style=\"min-width:100%; text-align: left\">\n                                                            <tbody>\n                                                                ";
frame = frame.push();
var t_45 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41);
if(t_45) {t_45 = runtime.fromIterator(t_45);
var t_43;
if(runtime.isArray(t_45)) {
var t_44 = t_45.length;
for(t_43=0; t_43 < t_45.length; t_43++) {
var t_46 = t_45[t_43][0];
frame.set("[object Object]", t_45[t_43][0]);
var t_47 = t_45[t_43][1];
frame.set("[object Object]", t_45[t_43][1]);
frame.set("loop.index", t_43 + 1);
frame.set("loop.index0", t_43);
frame.set("loop.revindex", t_44 - t_43);
frame.set("loop.revindex0", t_44 - t_43 - 1);
frame.set("loop.first", t_43 === 0);
frame.set("loop.last", t_43 === t_44 - 1);
frame.set("loop.length", t_44);
output += "\n                                                                    <tr>\n                                                                        ";
if(runtime.inOperator(t_12,("Items","Items (Sorted by Item)"))) {
output += "\n                                                                            ";
if(t_46 == "Diddy Kong") {
output += "\n                                                                                <td>Japes Kong</td>\n                                                                            ";
;
}
else {
if(t_46 == "Lanky Kong") {
output += "\n                                                                                <td>Llama Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_46 == "Tiny Kong") {
output += "\n                                                                                <td>Tiny Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_46 == "Chunky Kong") {
output += "\n                                                                                <td>Factory Kong</td>\n                                                                            ";
;
}
else {
output += "\n                                                                                <td>";
output += runtime.suppressValue(t_46, env.opts.autoescape);
output += "</td>\n                                                                            ";
;
}
;
}
;
}
;
}
output += "\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(t_46, env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                        ";
if(env.getFilter("isIterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41)),t_46))) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("safe").call(context, env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41)),t_46),"<br>")), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41)),t_46), env.opts.autoescape);
output += "\n                                                                                ";
if(t_12 == "Cosmetics" && t_41 == "Colors" && runtime.inOperator("Color",t_46)) {
output += "\n                                                                                    <span class=\"color-demo-box\"\n                                                                                        style=\"background-color:";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41)),t_46), env.opts.autoescape);
output += "\">&nbsp;</span>\n                                                                                ";
;
}
output += "\n                                                                            </td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
} else {
t_43 = -1;
var t_44 = runtime.keys(t_45).length;
for(var t_48 in t_45) {
t_43++;
var t_49 = t_45[t_48];
frame.set("item2", t_48);
frame.set("obj", t_49);
frame.set("loop.index", t_43 + 1);
frame.set("loop.index0", t_43);
frame.set("loop.revindex", t_44 - t_43);
frame.set("loop.revindex0", t_44 - t_43 - 1);
frame.set("loop.first", t_43 === 0);
frame.set("loop.last", t_43 === t_44 - 1);
frame.set("loop.length", t_44);
output += "\n                                                                    <tr>\n                                                                        ";
if(runtime.inOperator(t_12,("Items","Items (Sorted by Item)"))) {
output += "\n                                                                            ";
if(t_48 == "Diddy Kong") {
output += "\n                                                                                <td>Japes Kong</td>\n                                                                            ";
;
}
else {
if(t_48 == "Lanky Kong") {
output += "\n                                                                                <td>Llama Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_48 == "Tiny Kong") {
output += "\n                                                                                <td>Tiny Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_48 == "Chunky Kong") {
output += "\n                                                                                <td>Factory Kong</td>\n                                                                            ";
;
}
else {
output += "\n                                                                                <td>";
output += runtime.suppressValue(t_48, env.opts.autoescape);
output += "</td>\n                                                                            ";
;
}
;
}
;
}
;
}
output += "\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(t_48, env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                        ";
if(env.getFilter("isIterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41)),t_48))) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("safe").call(context, env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41)),t_48),"<br>")), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41)),t_48), env.opts.autoescape);
output += "\n                                                                                ";
if(t_12 == "Cosmetics" && t_41 == "Colors" && runtime.inOperator("Color",t_48)) {
output += "\n                                                                                    <span class=\"color-demo-box\"\n                                                                                        style=\"background-color:";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41)),t_48), env.opts.autoescape);
output += "\">&nbsp;</span>\n                                                                                ";
;
}
output += "\n                                                                            </td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
}
}
frame = frame.pop();
output += "\n                                                            </tbody>\n                                                        </table>\n                                                    </div>\n                                                </div>\n                                            ";
;
}
output += "\n                                        ";
;
}
} else {
t_38 = -1;
var t_39 = runtime.keys(t_40).length;
for(var t_50 in t_40) {
t_38++;
var t_51 = t_40[t_50];
frame.set("sub_group", t_50);
frame.set("obj", t_51);
frame.set("loop.index", t_38 + 1);
frame.set("loop.index0", t_38);
frame.set("loop.revindex", t_39 - t_38);
frame.set("loop.revindex0", t_39 - t_38 - 1);
frame.set("loop.first", t_38 === 0);
frame.set("loop.last", t_38 === t_39 - 1);
frame.set("loop.length", t_39);
output += "\n                                            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50) != {}) {
output += "\n                                                <div class=\"spoiler-group\">\n                                                    <div class=\"spoiler-subsection-head d-flex collapsed\"\n                                                    id=\"spoilerDropdown";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_50), env.opts.autoescape);
output += "\"\n                                                    data-bs-toggle=\"collapse\"\n                                                    data-bs-target=\"#spoilerContent";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_50), env.opts.autoescape);
output += "\"\n                                                    aria-expanded=\"false\"\n                                                    aria-controls=\"spoilerContent";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_50), env.opts.autoescape);
output += "\">\n                                                        <div class=\"flex-fill\">\n                                                            <h4>";
output += runtime.suppressValue(t_50, env.opts.autoescape);
output += "</h4>\n                                                            <div class=\"small fw-light text-start ps-2 pb-2\">\n                                                                ";
if(env.getFilter("length").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50)) == 1) {
output += "\n                                                                    1 Item\n                                                                ";
;
}
else {
output += "\n                                                                    ";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50)), env.opts.autoescape);
output += " Items\n                                                                ";
;
}
output += "\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"text-end small fw-light p-2 pe-4 position-relative\">\n                                                            <div class=\"position-absolute top-50 start-0 translate-middle spoiler-subsection-expand\"></div>\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"collapse mb-5\" id=\"spoilerContent";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_50), env.opts.autoescape);
output += "\">\n                                                        <table class=\"table table-hover table-striped ignore-width\" style=\"min-width:100%; text-align: left\">\n                                                            <tbody>\n                                                                ";
frame = frame.push();
var t_54 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50);
if(t_54) {t_54 = runtime.fromIterator(t_54);
var t_52;
if(runtime.isArray(t_54)) {
var t_53 = t_54.length;
for(t_52=0; t_52 < t_54.length; t_52++) {
var t_55 = t_54[t_52][0];
frame.set("[object Object]", t_54[t_52][0]);
var t_56 = t_54[t_52][1];
frame.set("[object Object]", t_54[t_52][1]);
frame.set("loop.index", t_52 + 1);
frame.set("loop.index0", t_52);
frame.set("loop.revindex", t_53 - t_52);
frame.set("loop.revindex0", t_53 - t_52 - 1);
frame.set("loop.first", t_52 === 0);
frame.set("loop.last", t_52 === t_53 - 1);
frame.set("loop.length", t_53);
output += "\n                                                                    <tr>\n                                                                        ";
if(runtime.inOperator(t_12,("Items","Items (Sorted by Item)"))) {
output += "\n                                                                            ";
if(t_55 == "Diddy Kong") {
output += "\n                                                                                <td>Japes Kong</td>\n                                                                            ";
;
}
else {
if(t_55 == "Lanky Kong") {
output += "\n                                                                                <td>Llama Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_55 == "Tiny Kong") {
output += "\n                                                                                <td>Tiny Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_55 == "Chunky Kong") {
output += "\n                                                                                <td>Factory Kong</td>\n                                                                            ";
;
}
else {
output += "\n                                                                                <td>";
output += runtime.suppressValue(t_55, env.opts.autoescape);
output += "</td>\n                                                                            ";
;
}
;
}
;
}
;
}
output += "\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(t_55, env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                        ";
if(env.getFilter("isIterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50)),t_55))) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("safe").call(context, env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50)),t_55),"<br>")), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50)),t_55), env.opts.autoescape);
output += "\n                                                                                ";
if(t_12 == "Cosmetics" && t_50 == "Colors" && runtime.inOperator("Color",t_55)) {
output += "\n                                                                                    <span class=\"color-demo-box\"\n                                                                                        style=\"background-color:";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50)),t_55), env.opts.autoescape);
output += "\">&nbsp;</span>\n                                                                                ";
;
}
output += "\n                                                                            </td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
} else {
t_52 = -1;
var t_53 = runtime.keys(t_54).length;
for(var t_57 in t_54) {
t_52++;
var t_58 = t_54[t_57];
frame.set("item2", t_57);
frame.set("obj", t_58);
frame.set("loop.index", t_52 + 1);
frame.set("loop.index0", t_52);
frame.set("loop.revindex", t_53 - t_52);
frame.set("loop.revindex0", t_53 - t_52 - 1);
frame.set("loop.first", t_52 === 0);
frame.set("loop.last", t_52 === t_53 - 1);
frame.set("loop.length", t_53);
output += "\n                                                                    <tr>\n                                                                        ";
if(runtime.inOperator(t_12,("Items","Items (Sorted by Item)"))) {
output += "\n                                                                            ";
if(t_57 == "Diddy Kong") {
output += "\n                                                                                <td>Japes Kong</td>\n                                                                            ";
;
}
else {
if(t_57 == "Lanky Kong") {
output += "\n                                                                                <td>Llama Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_57 == "Tiny Kong") {
output += "\n                                                                                <td>Tiny Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_57 == "Chunky Kong") {
output += "\n                                                                                <td>Factory Kong</td>\n                                                                            ";
;
}
else {
output += "\n                                                                                <td>";
output += runtime.suppressValue(t_57, env.opts.autoescape);
output += "</td>\n                                                                            ";
;
}
;
}
;
}
;
}
output += "\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(t_57, env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                        ";
if(env.getFilter("isIterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50)),t_57))) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("safe").call(context, env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50)),t_57),"<br>")), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50)),t_57), env.opts.autoescape);
output += "\n                                                                                ";
if(t_12 == "Cosmetics" && t_50 == "Colors" && runtime.inOperator("Color",t_57)) {
output += "\n                                                                                    <span class=\"color-demo-box\"\n                                                                                        style=\"background-color:";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50)),t_57), env.opts.autoescape);
output += "\">&nbsp;</span>\n                                                                                ";
;
}
output += "\n                                                                            </td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
}
}
frame = frame.pop();
output += "\n                                                            </tbody>\n                                                        </table>\n                                                    </div>\n                                                </div>\n                                            ";
;
}
output += "\n                                        ";
;
}
}
}
frame = frame.pop();
output += "\n                                    ";
;
}
else {
output += "\n                                        <div class=\"spoiler-group\">\n                                            <table class=\"table table-hover table-striped ignore-width\" style=\"min-width:100%; text-align: left\">\n                                                <tbody>\n                                                    ";
frame = frame.push();
var t_61 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12);
if(t_61) {t_61 = runtime.fromIterator(t_61);
var t_59;
if(runtime.isArray(t_61)) {
var t_60 = t_61.length;
for(t_59=0; t_59 < t_61.length; t_59++) {
var t_62 = t_61[t_59][0];
frame.set("[object Object]", t_61[t_59][0]);
var t_63 = t_61[t_59][1];
frame.set("[object Object]", t_61[t_59][1]);
frame.set("loop.index", t_59 + 1);
frame.set("loop.index0", t_59);
frame.set("loop.revindex", t_60 - t_59);
frame.set("loop.revindex0", t_60 - t_59 - 1);
frame.set("loop.first", t_59 === 0);
frame.set("loop.last", t_59 === t_60 - 1);
frame.set("loop.length", t_60);
output += "\n                                                        <tr>\n                                                            <td>";
output += runtime.suppressValue(t_62, env.opts.autoescape);
output += "</td>\n                                                            ";
if(t_12 == "Shuffled Exits") {
output += "\n                                                                ";
if(runtime.contextOrFrameLookup(context, frame, "lzr_type") == "coupled") {
output += "\n                                                                    <td class=\"directional_divider\">↔</td>\n                                                                ";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "lzr_type") == "decoupled") {
output += "\n                                                                    <td class=\"directional_divider\">→</td>\n                                                                ";
;
}
;
}
output += "\n                                                            ";
;
}
output += "\n                                                            ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_62)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_62)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_62)) === true)) {
output += "\n                                                                <td>";
output += runtime.suppressValue(env.getFilter("safe").call(context, env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_62),"<br>")), env.opts.autoescape);
output += "</td>\n                                                            ";
;
}
else {
output += "\n                                                                <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_62), env.opts.autoescape);
output += "</td>\n                                                            ";
;
}
output += "\n                                                            ";
if(t_12 == "Way of the Hoard") {
output += "\n                                                                <td>\n                                                                    <a class=\"no-decoration\"\n                                                                        onclick=\"\n                                                                            document.getElementById('spoilerTab";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "').click();\n                                                                            if (document.getElementById('spoilerDropdown";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_62)), env.opts.autoescape);
output += "').getAttribute('aria-expanded') == 'false') {\n                                                                                document.getElementById('spoilerDropdown";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_62)), env.opts.autoescape);
output += "').click()\n                                                                            }\n                                                                        \" \n                                                                        href=\"#spoilerDropdown";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_62)), env.opts.autoescape);
output += "\">\n                                                                        Go to path\n                                                                    </a>\n                                                                </td>\n                                                            ";
;
}
output += "\n                                                        </tr>\n                                                    ";
;
}
} else {
t_59 = -1;
var t_60 = runtime.keys(t_61).length;
for(var t_64 in t_61) {
t_59++;
var t_65 = t_61[t_64];
frame.set("item2", t_64);
frame.set("obj", t_65);
frame.set("loop.index", t_59 + 1);
frame.set("loop.index0", t_59);
frame.set("loop.revindex", t_60 - t_59);
frame.set("loop.revindex0", t_60 - t_59 - 1);
frame.set("loop.first", t_59 === 0);
frame.set("loop.last", t_59 === t_60 - 1);
frame.set("loop.length", t_60);
output += "\n                                                        <tr>\n                                                            <td>";
output += runtime.suppressValue(t_64, env.opts.autoescape);
output += "</td>\n                                                            ";
if(t_12 == "Shuffled Exits") {
output += "\n                                                                ";
if(runtime.contextOrFrameLookup(context, frame, "lzr_type") == "coupled") {
output += "\n                                                                    <td class=\"directional_divider\">↔</td>\n                                                                ";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "lzr_type") == "decoupled") {
output += "\n                                                                    <td class=\"directional_divider\">→</td>\n                                                                ";
;
}
;
}
output += "\n                                                            ";
;
}
output += "\n                                                            ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_64)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_64)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_64)) === true)) {
output += "\n                                                                <td>";
output += runtime.suppressValue(env.getFilter("safe").call(context, env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_64),"<br>")), env.opts.autoescape);
output += "</td>\n                                                            ";
;
}
else {
output += "\n                                                                <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_64), env.opts.autoescape);
output += "</td>\n                                                            ";
;
}
output += "\n                                                            ";
if(t_12 == "Way of the Hoard") {
output += "\n                                                                <td>\n                                                                    <a class=\"no-decoration\"\n                                                                        onclick=\"\n                                                                            document.getElementById('spoilerTab";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "').click();\n                                                                            if (document.getElementById('spoilerDropdown";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_64)), env.opts.autoescape);
output += "').getAttribute('aria-expanded') == 'false') {\n                                                                                document.getElementById('spoilerDropdown";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_64)), env.opts.autoescape);
output += "').click()\n                                                                            }\n                                                                        \" \n                                                                        href=\"#spoilerDropdown";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_64)), env.opts.autoescape);
output += "\">\n                                                                        Go to path\n                                                                    </a>\n                                                                </td>\n                                                            ";
;
}
output += "\n                                                        </tr>\n                                                    ";
;
}
}
}
frame = frame.pop();
output += "\n                                                </tbody>\n                                            </table>\n                                        </div>\n                                    ";
;
}
;
}
output += "\n                                ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12) == "True" || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12) == "False") {
output += "\n                                    <div class=\"spoiler-group\">\n                                        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12), env.opts.autoescape);
output += "\n                                    </div>\n                                ";
;
}
else {
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)) === true)) {
output += "\n                                    <div class=\"spoiler-group\">\n                                        <table class=\"table table-hover table-striped ignore-width\" style=\"min-width:100%; text-align: left\">\n                                            <tbody>\n                                                ";
frame = frame.push();
var t_68 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12);
if(t_68) {t_68 = runtime.fromIterator(t_68);
var t_67 = t_68.length;
for(var t_66=0; t_66 < t_68.length; t_66++) {
var t_69 = t_68[t_66];
frame.set("item2", t_69);
frame.set("loop.index", t_66 + 1);
frame.set("loop.index0", t_66);
frame.set("loop.revindex", t_67 - t_66);
frame.set("loop.revindex0", t_67 - t_66 - 1);
frame.set("loop.first", t_66 === 0);
frame.set("loop.last", t_66 === t_67 - 1);
frame.set("loop.length", t_67);
output += "\n                                                    <tr>\n                                                        <td>";
output += runtime.suppressValue(t_69, env.opts.autoescape);
output += "</td>\n                                                    </tr>\n                                                ";
;
}
}
frame = frame.pop();
output += "\n                                            </tbody>\n                                        </table>\n                                    </div>\n                                ";
;
}
else {
output += "\n                                    <div class=\"spoiler-group\">\n                                        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12), env.opts.autoescape);
output += "\n                                    </div>\n                                ";
;
}
;
}
;
}
output += "\n                            </div>\n                        </div>\n                    ";
;
}
output += "\n                ";
;
}
} else {
t_9 = -1;
var t_10 = runtime.keys(t_11).length;
for(var t_70 in t_11) {
t_9++;
var t_71 = t_11[t_70];
frame.set("item", t_70);
frame.set("obj", t_71);
frame.set("loop.index", t_9 + 1);
frame.set("loop.index0", t_9);
frame.set("loop.revindex", t_10 - t_9);
frame.set("loop.revindex0", t_10 - t_9 - 1);
frame.set("loop.first", t_9 === 0);
frame.set("loop.last", t_9 === t_10 - 1);
frame.set("loop.length", t_10);
output += "\n                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70) != {} && !runtime.inOperator(t_70,runtime.contextOrFrameLookup(context, frame, "ignored_attrs"))) {
output += "\n                        ";
var t_72;
t_72 = "";
frame.set("tab_cls", t_72, true);
if(frame.topLevel) {
context.setVariable("tab_cls", t_72);
}
if(frame.topLevel) {
context.addExport("tab_cls", t_72);
}
output += "\n                        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index") == "0") {
output += "\n                            ";
var t_73;
t_73 = " show active";
frame.set("tab_cls", t_73, true);
if(frame.topLevel) {
context.setVariable("tab_cls", t_73);
}
if(frame.topLevel) {
context.addExport("tab_cls", t_73);
}
output += "\n                        ";
;
}
output += "\n                        <div class=\"tab-pane fade";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tab_cls"), env.opts.autoescape);
output += "\" id=\"spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "\">\n                            <div class=\"container mt-4\">\n                                ";
if(env.getTest("mapping").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)) === true) {
output += "\n                                    ";
if(t_70 == "Way of the Hoard") {
output += "\n                                        <div class=\"p-2 text-start border\">\n                                            ";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)), env.opts.autoescape);
output += " Items are on the Way of the Hoard\n                                        </div>\n                                    ";
;
}
output += "\n                                    ";
if(t_70 == "Playthrough") {
output += "\n                                        ";
frame = frame.push();
var t_76 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70);
if(t_76) {t_76 = runtime.fromIterator(t_76);
var t_74;
if(runtime.isArray(t_76)) {
var t_75 = t_76.length;
for(t_74=0; t_74 < t_76.length; t_74++) {
var t_77 = t_76[t_74][0];
frame.set("[object Object]", t_76[t_74][0]);
var t_78 = t_76[t_74][1];
frame.set("[object Object]", t_76[t_74][1]);
frame.set("loop.index", t_74 + 1);
frame.set("loop.index0", t_74);
frame.set("loop.revindex", t_75 - t_74);
frame.set("loop.revindex0", t_75 - t_74 - 1);
frame.set("loop.first", t_74 === 0);
frame.set("loop.last", t_74 === t_75 - 1);
frame.set("loop.length", t_75);
output += "\n                                            <div class=\"spoiler-group\">\n                                                <div class=\"spoiler-subsection-head d-flex collapsed\"\n                                                    data-bs-toggle=\"collapse\"\n                                                    data-bs-target=\"#spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(t_77, env.opts.autoescape);
output += "\"\n                                                    aria-expanded=\"false\"\n                                                    aria-controls=\"spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(t_77, env.opts.autoescape);
output += "\">\n                                                    <div class=\"flex-fill\">\n                                                        <h4>\n                                                            Sphere ";
output += runtime.suppressValue(t_77, env.opts.autoescape);
output += "\n                                                        </h4>\n                                                        <div class=\"small fw-light text-start ps-2 pb-2\">\n                                                            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_77)),"Available GBs") != 1) {
output += "\n                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_77)),"Available GBs"), env.opts.autoescape);
output += " GBs available\n                                                            ";
;
}
else {
output += "\n                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_77)),"Available GBs"), env.opts.autoescape);
output += " GB available\n                                                            ";
;
}
output += "\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"text-end small fw-light p-2 pe-4 position-relative\">\n                                                        <div class=\"position-absolute top-50 start-0 translate-middle spoiler-subsection-expand\"></div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"collapse mb-5\" id=\"spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(t_77, env.opts.autoescape);
output += "\">\n                                                    <table class=\"table table-hover table-striped ignore-width\" style=\"min-width:100%; text-align: left\">\n                                                        <tbody>\n                                                            ";
frame = frame.push();
var t_81 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_77);
if(t_81) {t_81 = runtime.fromIterator(t_81);
var t_79;
if(runtime.isArray(t_81)) {
var t_80 = t_81.length;
for(t_79=0; t_79 < t_81.length; t_79++) {
var t_82 = t_81[t_79][0];
frame.set("[object Object]", t_81[t_79][0]);
var t_83 = t_81[t_79][1];
frame.set("[object Object]", t_81[t_79][1]);
frame.set("loop.index", t_79 + 1);
frame.set("loop.index0", t_79);
frame.set("loop.revindex", t_80 - t_79);
frame.set("loop.revindex0", t_80 - t_79 - 1);
frame.set("loop.first", t_79 === 0);
frame.set("loop.last", t_79 === t_80 - 1);
frame.set("loop.length", t_80);
output += "\n                                                                ";
if(t_82 != "Available GBs") {
output += "\n                                                                    <tr>\n                                                                        <td>";
output += runtime.suppressValue(t_82, env.opts.autoescape);
output += "</td>\n                                                                        ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_77)),t_82)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_77)),t_82)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_77)),t_82)) === true)) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_77)),t_82),", "), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_77)),t_82), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
output += "\n                                                            ";
;
}
} else {
t_79 = -1;
var t_80 = runtime.keys(t_81).length;
for(var t_84 in t_81) {
t_79++;
var t_85 = t_81[t_84];
frame.set("item2", t_84);
frame.set("obj", t_85);
frame.set("loop.index", t_79 + 1);
frame.set("loop.index0", t_79);
frame.set("loop.revindex", t_80 - t_79);
frame.set("loop.revindex0", t_80 - t_79 - 1);
frame.set("loop.first", t_79 === 0);
frame.set("loop.last", t_79 === t_80 - 1);
frame.set("loop.length", t_80);
output += "\n                                                                ";
if(t_84 != "Available GBs") {
output += "\n                                                                    <tr>\n                                                                        <td>";
output += runtime.suppressValue(t_84, env.opts.autoescape);
output += "</td>\n                                                                        ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_77)),t_84)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_77)),t_84)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_77)),t_84)) === true)) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_77)),t_84),", "), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_77)),t_84), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
output += "\n                                                            ";
;
}
}
}
frame = frame.pop();
output += "\n                                                        </tbody>\n                                                    </table>\n                                                </div>\n                                            </div>\n                                        ";
;
}
} else {
t_74 = -1;
var t_75 = runtime.keys(t_76).length;
for(var t_86 in t_76) {
t_74++;
var t_87 = t_76[t_86];
frame.set("sphere_index", t_86);
frame.set("obj", t_87);
frame.set("loop.index", t_74 + 1);
frame.set("loop.index0", t_74);
frame.set("loop.revindex", t_75 - t_74);
frame.set("loop.revindex0", t_75 - t_74 - 1);
frame.set("loop.first", t_74 === 0);
frame.set("loop.last", t_74 === t_75 - 1);
frame.set("loop.length", t_75);
output += "\n                                            <div class=\"spoiler-group\">\n                                                <div class=\"spoiler-subsection-head d-flex collapsed\"\n                                                    data-bs-toggle=\"collapse\"\n                                                    data-bs-target=\"#spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(t_86, env.opts.autoescape);
output += "\"\n                                                    aria-expanded=\"false\"\n                                                    aria-controls=\"spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(t_86, env.opts.autoescape);
output += "\">\n                                                    <div class=\"flex-fill\">\n                                                        <h4>\n                                                            Sphere ";
output += runtime.suppressValue(t_86, env.opts.autoescape);
output += "\n                                                        </h4>\n                                                        <div class=\"small fw-light text-start ps-2 pb-2\">\n                                                            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_86)),"Available GBs") != 1) {
output += "\n                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_86)),"Available GBs"), env.opts.autoescape);
output += " GBs available\n                                                            ";
;
}
else {
output += "\n                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_86)),"Available GBs"), env.opts.autoescape);
output += " GB available\n                                                            ";
;
}
output += "\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"text-end small fw-light p-2 pe-4 position-relative\">\n                                                        <div class=\"position-absolute top-50 start-0 translate-middle spoiler-subsection-expand\"></div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"collapse mb-5\" id=\"spoilerContent";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(t_86, env.opts.autoescape);
output += "\">\n                                                    <table class=\"table table-hover table-striped ignore-width\" style=\"min-width:100%; text-align: left\">\n                                                        <tbody>\n                                                            ";
frame = frame.push();
var t_90 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_86);
if(t_90) {t_90 = runtime.fromIterator(t_90);
var t_88;
if(runtime.isArray(t_90)) {
var t_89 = t_90.length;
for(t_88=0; t_88 < t_90.length; t_88++) {
var t_91 = t_90[t_88][0];
frame.set("[object Object]", t_90[t_88][0]);
var t_92 = t_90[t_88][1];
frame.set("[object Object]", t_90[t_88][1]);
frame.set("loop.index", t_88 + 1);
frame.set("loop.index0", t_88);
frame.set("loop.revindex", t_89 - t_88);
frame.set("loop.revindex0", t_89 - t_88 - 1);
frame.set("loop.first", t_88 === 0);
frame.set("loop.last", t_88 === t_89 - 1);
frame.set("loop.length", t_89);
output += "\n                                                                ";
if(t_91 != "Available GBs") {
output += "\n                                                                    <tr>\n                                                                        <td>";
output += runtime.suppressValue(t_91, env.opts.autoescape);
output += "</td>\n                                                                        ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_86)),t_91)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_86)),t_91)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_86)),t_91)) === true)) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_86)),t_91),", "), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_86)),t_91), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
output += "\n                                                            ";
;
}
} else {
t_88 = -1;
var t_89 = runtime.keys(t_90).length;
for(var t_93 in t_90) {
t_88++;
var t_94 = t_90[t_93];
frame.set("item2", t_93);
frame.set("obj", t_94);
frame.set("loop.index", t_88 + 1);
frame.set("loop.index0", t_88);
frame.set("loop.revindex", t_89 - t_88);
frame.set("loop.revindex0", t_89 - t_88 - 1);
frame.set("loop.first", t_88 === 0);
frame.set("loop.last", t_88 === t_89 - 1);
frame.set("loop.length", t_89);
output += "\n                                                                ";
if(t_93 != "Available GBs") {
output += "\n                                                                    <tr>\n                                                                        <td>";
output += runtime.suppressValue(t_93, env.opts.autoescape);
output += "</td>\n                                                                        ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_86)),t_93)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_86)),t_93)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_86)),t_93)) === true)) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_86)),t_93),", "), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_86)),t_93), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
output += "\n                                                            ";
;
}
}
}
frame = frame.pop();
output += "\n                                                        </tbody>\n                                                    </table>\n                                                </div>\n                                            </div>\n                                        ";
;
}
}
}
frame = frame.pop();
output += "\n                                    ";
;
}
else {
if(t_70 == "Cosmetics" || t_70 == "Requirements" || t_70 == "Bosses" || t_70 == "Items" || t_70 == "Items (Sorted by Item)" || t_70 == "Shuffled Exits (Sorted by destination)" || t_70 == "Colored Banana Locations" || t_70 == "Wrinkly Door Locations" || t_70 == "Shuffled Bananaport Locations" || t_70 == "T&S Portal Locations" || t_70 == "Enemy Placement" || t_70 == "Paths" || t_70 == "WotH Paths" || t_70 == "Other Paths" || t_70 == "End Game" || t_70 == "Hints" || t_70 == "Misc Custom Locations") {
output += "\n                                    ";
output += "\n                                        ";
var t_95;
t_95 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index");
frame.set("local_loop", t_95, true);
if(frame.topLevel) {
context.setVariable("local_loop", t_95);
}
if(frame.topLevel) {
context.addExport("local_loop", t_95);
}
output += "\n                                        ";
frame = frame.push();
var t_98 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70);
if(t_98) {t_98 = runtime.fromIterator(t_98);
var t_96;
if(runtime.isArray(t_98)) {
var t_97 = t_98.length;
for(t_96=0; t_96 < t_98.length; t_96++) {
var t_99 = t_98[t_96][0];
frame.set("[object Object]", t_98[t_96][0]);
var t_100 = t_98[t_96][1];
frame.set("[object Object]", t_98[t_96][1]);
frame.set("loop.index", t_96 + 1);
frame.set("loop.index0", t_96);
frame.set("loop.revindex", t_97 - t_96);
frame.set("loop.revindex0", t_97 - t_96 - 1);
frame.set("loop.first", t_96 === 0);
frame.set("loop.last", t_96 === t_97 - 1);
frame.set("loop.length", t_97);
output += "\n                                            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99) != {}) {
output += "\n                                                <div class=\"spoiler-group\">\n                                                    <div class=\"spoiler-subsection-head d-flex collapsed\"\n                                                    id=\"spoilerDropdown";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_99), env.opts.autoescape);
output += "\"\n                                                    data-bs-toggle=\"collapse\"\n                                                    data-bs-target=\"#spoilerContent";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_99), env.opts.autoescape);
output += "\"\n                                                    aria-expanded=\"false\"\n                                                    aria-controls=\"spoilerContent";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_99), env.opts.autoescape);
output += "\">\n                                                        <div class=\"flex-fill\">\n                                                            <h4>";
output += runtime.suppressValue(t_99, env.opts.autoescape);
output += "</h4>\n                                                            <div class=\"small fw-light text-start ps-2 pb-2\">\n                                                                ";
if(env.getFilter("length").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99)) == 1) {
output += "\n                                                                    1 Item\n                                                                ";
;
}
else {
output += "\n                                                                    ";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99)), env.opts.autoescape);
output += " Items\n                                                                ";
;
}
output += "\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"text-end small fw-light p-2 pe-4 position-relative\">\n                                                            <div class=\"position-absolute top-50 start-0 translate-middle spoiler-subsection-expand\"></div>\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"collapse mb-5\" id=\"spoilerContent";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_99), env.opts.autoescape);
output += "\">\n                                                        <table class=\"table table-hover table-striped ignore-width\" style=\"min-width:100%; text-align: left\">\n                                                            <tbody>\n                                                                ";
frame = frame.push();
var t_103 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99);
if(t_103) {t_103 = runtime.fromIterator(t_103);
var t_101;
if(runtime.isArray(t_103)) {
var t_102 = t_103.length;
for(t_101=0; t_101 < t_103.length; t_101++) {
var t_104 = t_103[t_101][0];
frame.set("[object Object]", t_103[t_101][0]);
var t_105 = t_103[t_101][1];
frame.set("[object Object]", t_103[t_101][1]);
frame.set("loop.index", t_101 + 1);
frame.set("loop.index0", t_101);
frame.set("loop.revindex", t_102 - t_101);
frame.set("loop.revindex0", t_102 - t_101 - 1);
frame.set("loop.first", t_101 === 0);
frame.set("loop.last", t_101 === t_102 - 1);
frame.set("loop.length", t_102);
output += "\n                                                                    <tr>\n                                                                        ";
if(runtime.inOperator(t_70,("Items","Items (Sorted by Item)"))) {
output += "\n                                                                            ";
if(t_104 == "Diddy Kong") {
output += "\n                                                                                <td>Japes Kong</td>\n                                                                            ";
;
}
else {
if(t_104 == "Lanky Kong") {
output += "\n                                                                                <td>Llama Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_104 == "Tiny Kong") {
output += "\n                                                                                <td>Tiny Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_104 == "Chunky Kong") {
output += "\n                                                                                <td>Factory Kong</td>\n                                                                            ";
;
}
else {
output += "\n                                                                                <td>";
output += runtime.suppressValue(t_104, env.opts.autoescape);
output += "</td>\n                                                                            ";
;
}
;
}
;
}
;
}
output += "\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(t_104, env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                        ";
if(env.getFilter("isIterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99)),t_104))) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("safe").call(context, env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99)),t_104),"<br>")), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99)),t_104), env.opts.autoescape);
output += "\n                                                                                ";
if(t_70 == "Cosmetics" && t_99 == "Colors" && runtime.inOperator("Color",t_104)) {
output += "\n                                                                                    <span class=\"color-demo-box\"\n                                                                                        style=\"background-color:";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99)),t_104), env.opts.autoescape);
output += "\">&nbsp;</span>\n                                                                                ";
;
}
output += "\n                                                                            </td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
} else {
t_101 = -1;
var t_102 = runtime.keys(t_103).length;
for(var t_106 in t_103) {
t_101++;
var t_107 = t_103[t_106];
frame.set("item2", t_106);
frame.set("obj", t_107);
frame.set("loop.index", t_101 + 1);
frame.set("loop.index0", t_101);
frame.set("loop.revindex", t_102 - t_101);
frame.set("loop.revindex0", t_102 - t_101 - 1);
frame.set("loop.first", t_101 === 0);
frame.set("loop.last", t_101 === t_102 - 1);
frame.set("loop.length", t_102);
output += "\n                                                                    <tr>\n                                                                        ";
if(runtime.inOperator(t_70,("Items","Items (Sorted by Item)"))) {
output += "\n                                                                            ";
if(t_106 == "Diddy Kong") {
output += "\n                                                                                <td>Japes Kong</td>\n                                                                            ";
;
}
else {
if(t_106 == "Lanky Kong") {
output += "\n                                                                                <td>Llama Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_106 == "Tiny Kong") {
output += "\n                                                                                <td>Tiny Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_106 == "Chunky Kong") {
output += "\n                                                                                <td>Factory Kong</td>\n                                                                            ";
;
}
else {
output += "\n                                                                                <td>";
output += runtime.suppressValue(t_106, env.opts.autoescape);
output += "</td>\n                                                                            ";
;
}
;
}
;
}
;
}
output += "\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(t_106, env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                        ";
if(env.getFilter("isIterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99)),t_106))) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("safe").call(context, env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99)),t_106),"<br>")), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99)),t_106), env.opts.autoescape);
output += "\n                                                                                ";
if(t_70 == "Cosmetics" && t_99 == "Colors" && runtime.inOperator("Color",t_106)) {
output += "\n                                                                                    <span class=\"color-demo-box\"\n                                                                                        style=\"background-color:";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99)),t_106), env.opts.autoescape);
output += "\">&nbsp;</span>\n                                                                                ";
;
}
output += "\n                                                                            </td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
}
}
frame = frame.pop();
output += "\n                                                            </tbody>\n                                                        </table>\n                                                    </div>\n                                                </div>\n                                            ";
;
}
output += "\n                                        ";
;
}
} else {
t_96 = -1;
var t_97 = runtime.keys(t_98).length;
for(var t_108 in t_98) {
t_96++;
var t_109 = t_98[t_108];
frame.set("sub_group", t_108);
frame.set("obj", t_109);
frame.set("loop.index", t_96 + 1);
frame.set("loop.index0", t_96);
frame.set("loop.revindex", t_97 - t_96);
frame.set("loop.revindex0", t_97 - t_96 - 1);
frame.set("loop.first", t_96 === 0);
frame.set("loop.last", t_96 === t_97 - 1);
frame.set("loop.length", t_97);
output += "\n                                            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108) != {}) {
output += "\n                                                <div class=\"spoiler-group\">\n                                                    <div class=\"spoiler-subsection-head d-flex collapsed\"\n                                                    id=\"spoilerDropdown";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_108), env.opts.autoescape);
output += "\"\n                                                    data-bs-toggle=\"collapse\"\n                                                    data-bs-target=\"#spoilerContent";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_108), env.opts.autoescape);
output += "\"\n                                                    aria-expanded=\"false\"\n                                                    aria-controls=\"spoilerContent";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_108), env.opts.autoescape);
output += "\">\n                                                        <div class=\"flex-fill\">\n                                                            <h4>";
output += runtime.suppressValue(t_108, env.opts.autoescape);
output += "</h4>\n                                                            <div class=\"small fw-light text-start ps-2 pb-2\">\n                                                                ";
if(env.getFilter("length").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108)) == 1) {
output += "\n                                                                    1 Item\n                                                                ";
;
}
else {
output += "\n                                                                    ";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108)), env.opts.autoescape);
output += " Items\n                                                                ";
;
}
output += "\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"text-end small fw-light p-2 pe-4 position-relative\">\n                                                            <div class=\"position-absolute top-50 start-0 translate-middle spoiler-subsection-expand\"></div>\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"collapse mb-5\" id=\"spoilerContent";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "local_loop"), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, t_108), env.opts.autoescape);
output += "\">\n                                                        <table class=\"table table-hover table-striped ignore-width\" style=\"min-width:100%; text-align: left\">\n                                                            <tbody>\n                                                                ";
frame = frame.push();
var t_112 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108);
if(t_112) {t_112 = runtime.fromIterator(t_112);
var t_110;
if(runtime.isArray(t_112)) {
var t_111 = t_112.length;
for(t_110=0; t_110 < t_112.length; t_110++) {
var t_113 = t_112[t_110][0];
frame.set("[object Object]", t_112[t_110][0]);
var t_114 = t_112[t_110][1];
frame.set("[object Object]", t_112[t_110][1]);
frame.set("loop.index", t_110 + 1);
frame.set("loop.index0", t_110);
frame.set("loop.revindex", t_111 - t_110);
frame.set("loop.revindex0", t_111 - t_110 - 1);
frame.set("loop.first", t_110 === 0);
frame.set("loop.last", t_110 === t_111 - 1);
frame.set("loop.length", t_111);
output += "\n                                                                    <tr>\n                                                                        ";
if(runtime.inOperator(t_70,("Items","Items (Sorted by Item)"))) {
output += "\n                                                                            ";
if(t_113 == "Diddy Kong") {
output += "\n                                                                                <td>Japes Kong</td>\n                                                                            ";
;
}
else {
if(t_113 == "Lanky Kong") {
output += "\n                                                                                <td>Llama Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_113 == "Tiny Kong") {
output += "\n                                                                                <td>Tiny Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_113 == "Chunky Kong") {
output += "\n                                                                                <td>Factory Kong</td>\n                                                                            ";
;
}
else {
output += "\n                                                                                <td>";
output += runtime.suppressValue(t_113, env.opts.autoescape);
output += "</td>\n                                                                            ";
;
}
;
}
;
}
;
}
output += "\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(t_113, env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                        ";
if(env.getFilter("isIterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108)),t_113))) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("safe").call(context, env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108)),t_113),"<br>")), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108)),t_113), env.opts.autoescape);
output += "\n                                                                                ";
if(t_70 == "Cosmetics" && t_108 == "Colors" && runtime.inOperator("Color",t_113)) {
output += "\n                                                                                    <span class=\"color-demo-box\"\n                                                                                        style=\"background-color:";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108)),t_113), env.opts.autoescape);
output += "\">&nbsp;</span>\n                                                                                ";
;
}
output += "\n                                                                            </td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
} else {
t_110 = -1;
var t_111 = runtime.keys(t_112).length;
for(var t_115 in t_112) {
t_110++;
var t_116 = t_112[t_115];
frame.set("item2", t_115);
frame.set("obj", t_116);
frame.set("loop.index", t_110 + 1);
frame.set("loop.index0", t_110);
frame.set("loop.revindex", t_111 - t_110);
frame.set("loop.revindex0", t_111 - t_110 - 1);
frame.set("loop.first", t_110 === 0);
frame.set("loop.last", t_110 === t_111 - 1);
frame.set("loop.length", t_111);
output += "\n                                                                    <tr>\n                                                                        ";
if(runtime.inOperator(t_70,("Items","Items (Sorted by Item)"))) {
output += "\n                                                                            ";
if(t_115 == "Diddy Kong") {
output += "\n                                                                                <td>Japes Kong</td>\n                                                                            ";
;
}
else {
if(t_115 == "Lanky Kong") {
output += "\n                                                                                <td>Llama Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_115 == "Tiny Kong") {
output += "\n                                                                                <td>Tiny Temple Kong</td>\n                                                                            ";
;
}
else {
if(t_115 == "Chunky Kong") {
output += "\n                                                                                <td>Factory Kong</td>\n                                                                            ";
;
}
else {
output += "\n                                                                                <td>";
output += runtime.suppressValue(t_115, env.opts.autoescape);
output += "</td>\n                                                                            ";
;
}
;
}
;
}
;
}
output += "\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>";
output += runtime.suppressValue(t_115, env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
output += "\n                                                                        ";
if(env.getFilter("isIterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108)),t_115))) {
output += "\n                                                                            <td>";
output += runtime.suppressValue(env.getFilter("safe").call(context, env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108)),t_115),"<br>")), env.opts.autoescape);
output += "</td>\n                                                                        ";
;
}
else {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108)),t_115), env.opts.autoescape);
output += "\n                                                                                ";
if(t_70 == "Cosmetics" && t_108 == "Colors" && runtime.inOperator("Color",t_115)) {
output += "\n                                                                                    <span class=\"color-demo-box\"\n                                                                                        style=\"background-color:";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108)),t_115), env.opts.autoescape);
output += "\">&nbsp;</span>\n                                                                                ";
;
}
output += "\n                                                                            </td>\n                                                                        ";
;
}
output += "\n                                                                    </tr>\n                                                                ";
;
}
}
}
frame = frame.pop();
output += "\n                                                            </tbody>\n                                                        </table>\n                                                    </div>\n                                                </div>\n                                            ";
;
}
output += "\n                                        ";
;
}
}
}
frame = frame.pop();
output += "\n                                    ";
;
}
else {
output += "\n                                        <div class=\"spoiler-group\">\n                                            <table class=\"table table-hover table-striped ignore-width\" style=\"min-width:100%; text-align: left\">\n                                                <tbody>\n                                                    ";
frame = frame.push();
var t_119 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70);
if(t_119) {t_119 = runtime.fromIterator(t_119);
var t_117;
if(runtime.isArray(t_119)) {
var t_118 = t_119.length;
for(t_117=0; t_117 < t_119.length; t_117++) {
var t_120 = t_119[t_117][0];
frame.set("[object Object]", t_119[t_117][0]);
var t_121 = t_119[t_117][1];
frame.set("[object Object]", t_119[t_117][1]);
frame.set("loop.index", t_117 + 1);
frame.set("loop.index0", t_117);
frame.set("loop.revindex", t_118 - t_117);
frame.set("loop.revindex0", t_118 - t_117 - 1);
frame.set("loop.first", t_117 === 0);
frame.set("loop.last", t_117 === t_118 - 1);
frame.set("loop.length", t_118);
output += "\n                                                        <tr>\n                                                            <td>";
output += runtime.suppressValue(t_120, env.opts.autoescape);
output += "</td>\n                                                            ";
if(t_70 == "Shuffled Exits") {
output += "\n                                                                ";
if(runtime.contextOrFrameLookup(context, frame, "lzr_type") == "coupled") {
output += "\n                                                                    <td class=\"directional_divider\">↔</td>\n                                                                ";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "lzr_type") == "decoupled") {
output += "\n                                                                    <td class=\"directional_divider\">→</td>\n                                                                ";
;
}
;
}
output += "\n                                                            ";
;
}
output += "\n                                                            ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_120)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_120)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_120)) === true)) {
output += "\n                                                                <td>";
output += runtime.suppressValue(env.getFilter("safe").call(context, env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_120),"<br>")), env.opts.autoescape);
output += "</td>\n                                                            ";
;
}
else {
output += "\n                                                                <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_120), env.opts.autoescape);
output += "</td>\n                                                            ";
;
}
output += "\n                                                            ";
if(t_70 == "Way of the Hoard") {
output += "\n                                                                <td>\n                                                                    <a class=\"no-decoration\"\n                                                                        onclick=\"\n                                                                            document.getElementById('spoilerTab";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "').click();\n                                                                            if (document.getElementById('spoilerDropdown";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_120)), env.opts.autoescape);
output += "').getAttribute('aria-expanded') == 'false') {\n                                                                                document.getElementById('spoilerDropdown";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_120)), env.opts.autoescape);
output += "').click()\n                                                                            }\n                                                                        \" \n                                                                        href=\"#spoilerDropdown";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_120)), env.opts.autoescape);
output += "\">\n                                                                        Go to path\n                                                                    </a>\n                                                                </td>\n                                                            ";
;
}
output += "\n                                                        </tr>\n                                                    ";
;
}
} else {
t_117 = -1;
var t_118 = runtime.keys(t_119).length;
for(var t_122 in t_119) {
t_117++;
var t_123 = t_119[t_122];
frame.set("item2", t_122);
frame.set("obj", t_123);
frame.set("loop.index", t_117 + 1);
frame.set("loop.index0", t_117);
frame.set("loop.revindex", t_118 - t_117);
frame.set("loop.revindex0", t_118 - t_117 - 1);
frame.set("loop.first", t_117 === 0);
frame.set("loop.last", t_117 === t_118 - 1);
frame.set("loop.length", t_118);
output += "\n                                                        <tr>\n                                                            <td>";
output += runtime.suppressValue(t_122, env.opts.autoescape);
output += "</td>\n                                                            ";
if(t_70 == "Shuffled Exits") {
output += "\n                                                                ";
if(runtime.contextOrFrameLookup(context, frame, "lzr_type") == "coupled") {
output += "\n                                                                    <td class=\"directional_divider\">↔</td>\n                                                                ";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "lzr_type") == "decoupled") {
output += "\n                                                                    <td class=\"directional_divider\">→</td>\n                                                                ";
;
}
;
}
output += "\n                                                            ";
;
}
output += "\n                                                            ";
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_122)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_122)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_122)) === true)) {
output += "\n                                                                <td>";
output += runtime.suppressValue(env.getFilter("safe").call(context, env.getFilter("join").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_122),"<br>")), env.opts.autoescape);
output += "</td>\n                                                            ";
;
}
else {
output += "\n                                                                <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_122), env.opts.autoescape);
output += "</td>\n                                                            ";
;
}
output += "\n                                                            ";
if(t_70 == "Way of the Hoard") {
output += "\n                                                                <td>\n                                                                    <a class=\"no-decoration\"\n                                                                        onclick=\"\n                                                                            document.getElementById('spoilerTab";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "').click();\n                                                                            if (document.getElementById('spoilerDropdown";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_122)), env.opts.autoescape);
output += "').getAttribute('aria-expanded') == 'false') {\n                                                                                document.getElementById('spoilerDropdown";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_122)), env.opts.autoescape);
output += "').click()\n                                                                            }\n                                                                        \" \n                                                                        href=\"#spoilerDropdown";
output += runtime.suppressValue(env.getFilter("wothpathindex").call(context, runtime.contextOrFrameLookup(context, frame, "spoiler")), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("filterId").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_122)), env.opts.autoescape);
output += "\">\n                                                                        Go to path\n                                                                    </a>\n                                                                </td>\n                                                            ";
;
}
output += "\n                                                        </tr>\n                                                    ";
;
}
}
}
frame = frame.pop();
output += "\n                                                </tbody>\n                                            </table>\n                                        </div>\n                                    ";
;
}
;
}
output += "\n                                ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70) == "True" || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70) == "False") {
output += "\n                                    <div class=\"spoiler-group\">\n                                        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70), env.opts.autoescape);
output += "\n                                    </div>\n                                ";
;
}
else {
if(env.getTest("iterable").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)) === true && (!env.getTest("string").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)) === true && !env.getTest("mapping").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)) === true)) {
output += "\n                                    <div class=\"spoiler-group\">\n                                        <table class=\"table table-hover table-striped ignore-width\" style=\"min-width:100%; text-align: left\">\n                                            <tbody>\n                                                ";
frame = frame.push();
var t_126 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70);
if(t_126) {t_126 = runtime.fromIterator(t_126);
var t_125 = t_126.length;
for(var t_124=0; t_124 < t_126.length; t_124++) {
var t_127 = t_126[t_124];
frame.set("item2", t_127);
frame.set("loop.index", t_124 + 1);
frame.set("loop.index0", t_124);
frame.set("loop.revindex", t_125 - t_124);
frame.set("loop.revindex0", t_125 - t_124 - 1);
frame.set("loop.first", t_124 === 0);
frame.set("loop.last", t_124 === t_125 - 1);
frame.set("loop.length", t_125);
output += "\n                                                    <tr>\n                                                        <td>";
output += runtime.suppressValue(t_127, env.opts.autoescape);
output += "</td>\n                                                    </tr>\n                                                ";
;
}
}
frame = frame.pop();
output += "\n                                            </tbody>\n                                        </table>\n                                    </div>\n                                ";
;
}
else {
output += "\n                                    <div class=\"spoiler-group\">\n                                        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70), env.opts.autoescape);
output += "\n                                    </div>\n                                ";
;
}
;
}
;
}
output += "\n                            </div>\n                        </div>\n                    ";
;
}
output += "\n                ";
;
}
}
}
frame = frame.pop();
output += "\n            </div>\n        </div>\n    </div>\n    ";
if(runtime.inOperator("Settings",runtime.contextOrFrameLookup(context, frame, "spoiler"))) {
output += "\n        <div class=\"accordion-item\">\n            <h2 class=\"accordion-header collapsed\"\n                    id=\"spoilerhead-settings\">\n                ";
output += "\n                <button class=\"accordion-button collapsed\" type=\"button\"\n                    data-bs-toggle=\"collapse\"\n                    data-bs-target=\"#spoileritem-settings\"\n                    aria-expanded=\"false\"\n                    aria-controls=\"spoileritem-settings\">\n                    Settings\n                </button>\n            </h2>\n            <div class=\"spoiler-item collapse\" id=\"spoileritem-settings\">\n                <div class=\"p-4 text-start\">\n                    <div class=\"fw-bold\">\n                        Settings String\n                    </div>\n                    <div class=\"fs-6 fw-light p-2 rounded\" style=\"background-color: rgba(0, 0, 0, 0.3)\">\n                        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),"Settings")),"Settings String"), env.opts.autoescape);
output += "\n                    </div>\n                </div>\n                <table class=\"table table-hover table-striped ignore-width\" style=\"min-width:100%; text-align: left\">\n                    <thead>\n                        <tr>\n                            <th>Property</th>\n                            <th>Value</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        ";
frame = frame.push();
var t_130 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),"Settings");
if(t_130) {t_130 = runtime.fromIterator(t_130);
var t_128;
if(runtime.isArray(t_130)) {
var t_129 = t_130.length;
for(t_128=0; t_128 < t_130.length; t_128++) {
var t_131 = t_130[t_128][0];
frame.set("[object Object]", t_130[t_128][0]);
var t_132 = t_130[t_128][1];
frame.set("[object Object]", t_130[t_128][1]);
frame.set("loop.index", t_128 + 1);
frame.set("loop.index0", t_128);
frame.set("loop.revindex", t_129 - t_128);
frame.set("loop.revindex0", t_129 - t_128 - 1);
frame.set("loop.first", t_128 === 0);
frame.set("loop.last", t_128 === t_129 - 1);
frame.set("loop.length", t_129);
output += "\n                            ";
if(!runtime.inOperator(t_131,("Generation Timestamp","Settings String","Seed","algorithm","Unlock Time"))) {
output += "\n                                <tr>\n                                    <td>";
output += runtime.suppressValue(t_131, env.opts.autoescape);
output += "</td>\n                                    <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),"Settings")),t_131), env.opts.autoescape);
output += "</td>\n                                </tr>\n                            ";
;
}
output += "\n                        ";
;
}
} else {
t_128 = -1;
var t_129 = runtime.keys(t_130).length;
for(var t_133 in t_130) {
t_128++;
var t_134 = t_130[t_133];
frame.set("item", t_133);
frame.set("obj", t_134);
frame.set("loop.index", t_128 + 1);
frame.set("loop.index0", t_128);
frame.set("loop.revindex", t_129 - t_128);
frame.set("loop.revindex0", t_129 - t_128 - 1);
frame.set("loop.first", t_128 === 0);
frame.set("loop.last", t_128 === t_129 - 1);
frame.set("loop.length", t_129);
output += "\n                            ";
if(!runtime.inOperator(t_133,("Generation Timestamp","Settings String","Seed","algorithm","Unlock Time"))) {
output += "\n                                <tr>\n                                    <td>";
output += runtime.suppressValue(t_133, env.opts.autoescape);
output += "</td>\n                                    <td>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),"Settings")),t_133), env.opts.autoescape);
output += "</td>\n                                </tr>\n                            ";
;
}
output += "\n                        ";
;
}
}
}
frame = frame.pop();
output += "\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    ";
;
}
output += "\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

