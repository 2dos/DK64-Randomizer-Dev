(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["admin.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!DOCTYPE html>\n<html lang=\"en\" data-bs-theme=\"dark\">\n\n<head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\" />\n    <meta name=\"description\" content=\"\" />\n    <meta name=\"author\" content=\"\" />\n    <title>DK64 Randomizer</title>\n    <link href=\"./base-hack/assets/DKTV/logo3.png\" rel=\"icon\" />\n    <script src=\"https://use.fontawesome.com/releases/v5.15.4/js/all.js\" crossorigin=\"anonymous\"></script>\n    <link href=\"https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900\" rel=\"stylesheet\" />\n    <link href=\"https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i\" rel=\"stylesheet\" />\n    <link href=\"static/styles/styles.css\" rel=\"stylesheet\" />\n    <link href=\"./static/styles/gui.css\" rel=\"stylesheet\" type=\"text/css\" />\n    <script src=\"https://code.jquery.com/jquery-3.7.1.min.js\" integrity=\"sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=\" crossorigin=\"anonymous\"></script>\n</head>\n\n<body id=\"page-top\">\n    <nav class=\"navbar navbar-expand-lg navbar-dark navbar-custom fixed-top\">\n        <div class=\"container px-5\">\n            <a class=\"navbar-brand\" href=\"#page-top\">DK64 Randomizer</a>\n            <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarResponsive\" aria-controls=\"navbarResponsive\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n                <span class=\"navbar-toggler-icon\"></span>\n            </button>\n            <div class=\"collapse navbar-collapse\" id=\"navbarResponsive\">\n                <ul class=\"navbar-nav ms-auto\">\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"./\">Overview</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"./wiki/Consoles-and-Emulators.html\">Setup</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"./wiki/home.html\">Wiki</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"https://discord.dk64randomizer.com\" target=\"_blank\">Discord</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </nav>\n    <header class=\"masthead text-center\">\n        <div class=\"masthead-content\">\n            <div class=\"card\" style=\"margin-top: 20px;\">\n                <div class=\"tab-content\">\n                    <div class=\"col border pb-3\">\n                        <h2 class=\"title\">Local Presets</h2>\n                        <div>\n                            Presets stored locally to the server, by entering a name, description, and settings string you can save a preset to the server to be used later.\n                        </div>\n                        <div>\n                            The value in Name is the only one that matters for deletion or creation, the preset dropdown just helps you select the preset you want to edit.\n                        </div>\n                        <div class=\"flex-container\" style=\"justify-content: center;\">\n                            <div class=\"item-select\">\n                                <label for=\"branch\" class=\"select-title\">Branch</label>\n                                <select class=\"form-select\" id=\"branch\">\n                                    <option value=\"\" disabled selected>Select a branch</option>\n                                    <option value=\"stable\">Master</option>\n                                    <option value=\"dev\">Dev</option>\n                                </select>\n                            </div>\n                            <div class=\"item-select\">\n                                <label for=\"presets\" class=\"select-title\">Presets</label>\n                                <select class=\"form-select\" id=\"presets\" disabled>\n                                    <option value=\"\" disabled selected>Select a preset</option>\n                                </select>\n                                <div style=\"display: flex; justify-content: space-evenly; padding-top: 10px;\">\n                                    <a id=\"raise_button\" class=\"btn btn-neutral\" disabled onClick=\"move_preset(true)\"><i class=\"fa fa-arrow-up\"></i></a>\n                                    <a id=\"lower_button\" class=\"btn btn-neutral\" disabled onClick=\"move_preset(false)\"><i class=\"fa fa-arrow-down\"></i></a>\n                                </div>\n                            </div>\n                            <div class=\"item-select\">\n                                <label for=\"name\" class=\"select-title\">Name</label>\n                                <textarea class=\"form-control\" id=\"name\" rows=\"6\" cols=\"50\"></textarea>\n                            </div>\n                            <div class=\"item-select\">\n                                <label for=\"description\" class=\"select-title\">Description</label>\n                                <textarea class=\"form-control\" id=\"description\" rows=\"6\" cols=\"50\"></textarea>\n                            </div>\n                            <div class=\"item-select\">\n                                <label for=\"settings\" class=\"select-title\">Settings String</label>\n                                <textarea class=\"form-control\" id=\"settings\" rows=\"6\" cols=\"50\"></textarea>\n                            </div>\n                        </div>\n                        <div class=\"flex-container\" style=\"justify-content: center;\">\n                            <a class=\"btn btn-danger btn-xl rounded-pill mt-5\" onClick=\"delete_preset()\">Delete</a>\n                            <a class=\"btn btn-success btn-xl rounded-pill mt-5\" onClick=\"save_preset()\">Save</a>\n                        </div>\n                        <script>\n                            // Use Flask-rendered local_presets\n                            var local_presets = ";
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
output += "<!--Populate tabs-->\n<script src=\"./static/js/sortable.min.js\"></script>\n<div class=\"tab-content\" id=\"nav-tabContent\">\n    <div class=\"tab-pane fade show active\"\n         id=\"nav-started\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-started-tab\">\n        ";
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
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-item\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-item-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("items.html", false, "base.html", false, function(t_6,t_5) {
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
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-requirements\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-requirements-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("requirements.html", false, "base.html", false, function(t_10,t_9) {
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
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-overworld\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-overworld-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("overworld.html", false, "base.html", false, function(t_14,t_13) {
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
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-progression\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-progression-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("progression.html", false, "base.html", false, function(t_18,t_17) {
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
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-qol\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-qol-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("qualityoflife.html", false, "base.html", false, function(t_22,t_21) {
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
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-cosmetics\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-cosmetics-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("cosmetics.html", false, "base.html", false, function(t_26,t_25) {
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
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-music\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-music-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("music.html", false, "base.html", false, function(t_30,t_29) {
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
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-plando\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-plando-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("plandomizer/plandomizer.html", false, "base.html", false, function(t_34,t_33) {
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
output += "\n    </div>\n    <div class=\"tab-pane fade\"\n         id=\"nav-settings\"\n         role=\"tabpanel\"\n         aria-labelledby=\"nav-settings-tab\">\n        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("settings.html", false, "base.html", false, function(t_38,t_37) {
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
output += "\n    </div>\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})})})})})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["complex-options/ice-trap.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div>\n    <div>\n        <p class=\"select-title\">Ice Trap Frequency</p>\n        <div class=\"d-flex\">\n            <input name=\"ice_trap_count\"\n                    id=\"ice_trap_count\"\n                    type=\"number\"\n                    display_name=\"Ice Trap Frequency\"\n                    class=\"form-control me-2\"\n                    aria-label=\"Ice Trap Frequency\"\n                    data-toggle=\"tooltip\"\n                    title=\"The amount of ice traps that will be attempted to be placed into the world.\"\n                    min=\"0\"\n                    max=\"999\"\n                    value=\"0\"\n            />\n            <input class=\"customize\"\n                type=\"button\"\n                href=\"#\"\n                data-bs-toggle=\"modal\"\n                data-bs-target=\"#trapModal\"\n                data-toggle=\"modal\"\n                title=\"Customize what models each slam gets\"/>\n        </div>\n    </div>\n</div>\n<div class=\"modal fade\" id=\"trapModal\" tabindex=\"-1\" aria-labelledby=\"trapModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h1 class=\"modal-title title\" id=\"trapModalLabel\">CONFIGURE ICE TRAPS</h1>\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"container-fluid\">\n                    <p>\n                        Configure the weights of all ice trap types. Hover over an ice trap name to learn it's effect.\n                        Setting a weight to 0 disables that trap effect from being used.\n                    </p>\n                    <div class=\"d-flex flex-wrap justify-content-center\">\n                        ";
var t_1;
t_1 = [{"name": "Bubble Trap","setting": "trap_weight_bubble","effect": "Places you in a bubble for 8 seconds. Can be broken prematurely by spinning the stick"},{"name": "Reverse Trap","setting": "trap_weight_reverse","effect": "Reverses your directional controls for 8 seconds."},{"name": "Slow Trap","setting": "trap_weight_slow","effect": "Slows the player down for 8 seconds."},{"name": "Disable A Trap","setting": "trap_weight_disablea","effect": "Disables the A Button for 8 seconds."},{"name": "Disable B Trap","setting": "trap_weight_disableb","effect": "Disables the B Button for 8 seconds."},{"name": "Disable Z Trap","setting": "trap_weight_disablez","effect": "Disables the Z Button for 8 seconds."},{"name": "Disable C-Up Trap","setting": "trap_weight_disablecu","effect": "Disables the C-Up Button for 8 seconds."},{"name": "Get Out Trap","setting": "trap_weight_getout","effect": "Spawns a get out guy. You have to enter another map within 10 seconds, or you'll die. The start button is disabled."},{"name": "Dry Trap","setting": "trap_weight_dry","effect": "Removes all replenishables."},{"name": "Flip Trap","setting": "trap_weight_flip","effect": "Flips the screen for 8 seconds."},{"name": "Ice Floor Trap","setting": "trap_weight_icefloor","effect": "Turns the floor icy for 15 seconds."},{"name": "Paper Trap","setting": "trap_weight_paper","effect": "Turns the kong into a paper version of itself for 15 seconds."},{"name": "Slip Trap","setting": "trap_weight_slip","effect": "Slips the player at some random point between 5 and 40 seconds after receiving the trap."},{"name": "Animal Trap","setting": "trap_weight_animal","effect": "Transforms you into either Rambi or Enguarde depending on if you're on land or not."},{"name": "Rockfall Trap","setting": "trap_weight_rockfall","effect": "Stalactites are raining down upon you."},{"name": "Disable Tag Trap","setting": "trap_weight_disabletag","effect": "Tags you to a different kong and locks you out of tagging for 15 seconds."}];
frame.set("trap_list", t_1, true);
if(frame.topLevel) {
context.setVariable("trap_list", t_1);
}
if(frame.topLevel) {
context.addExport("trap_list", t_1);
}
output += "\n                        ";
frame = frame.push();
var t_4 = runtime.contextOrFrameLookup(context, frame, "trap_list");
if(t_4) {t_4 = runtime.fromIterator(t_4);
var t_3 = t_4.length;
for(var t_2=0; t_2 < t_4.length; t_2++) {
var t_5 = t_4[t_2];
frame.set("trap", t_5);
frame.set("loop.index", t_2 + 1);
frame.set("loop.index0", t_2);
frame.set("loop.revindex", t_3 - t_2);
frame.set("loop.revindex0", t_3 - t_2 - 1);
frame.set("loop.first", t_2 === 0);
frame.set("loop.last", t_2 === t_3 - 1);
frame.set("loop.length", t_3);
output += "\n                            <div class=\"item-select\" style=\"margin:0;flex:0;min-width:150px;\" title=\"";
output += runtime.suppressValue(runtime.memberLookup((t_5),"effect"), env.opts.autoescape);
output += "\">\n                                <p class=\"select-title\">";
output += runtime.suppressValue(runtime.memberLookup((t_5),"name"), env.opts.autoescape);
output += "</p>\n                                <input name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_5),"setting"), env.opts.autoescape);
output += "\"\n                                    id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_5),"setting"), env.opts.autoescape);
output += "\"\n                                    type=\"number\"\n                                    display_name=\"Trap Weight - ";
output += runtime.suppressValue(runtime.memberLookup((t_5),"name"), env.opts.autoescape);
output += "\"\n                                    class=\"form-control my-3 mx-auto\"\n                                    aria-label=\"Trap Weight - ";
output += runtime.suppressValue(runtime.memberLookup((t_5),"name"), env.opts.autoescape);
output += "\"\n                                    data-toggle=\"tooltip\"\n                                    style=\"width:15%\"\n                                    min=\"0\"\n                                    max=\"100\"\n                                    value=\"0\"\n                                />\n                            </div>\n                        ";
;
}
}
frame = frame.pop();
output += "\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"trap_reset_default\">Reset to default</button>\n                <button type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>\n<script>\n    document.getElementById(\"trap_reset_default\").addEventListener(\"click\", (e) => {\n        Object.keys(default_trap_weights).forEach(stg => {\n            document.getElementById(stg).value = default_trap_weights[stg];\n        })\n    })\n</script>";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["complex-options/item-totals.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div>\n    <div>\n        <div class=\"d-flex\">\n            <button\n                class=\"btn btn-secondary btn-custom-large mt-3\"\n                type=\"button\"\n                href=\"#\"\n                data-bs-toggle=\"modal\"\n                data-bs-target=\"#itemCountModal\"\n                data-toggle=\"modal\"\n                title=\"Customize what models each slam gets\">\n                Item Count Modifier\n            </button>\n        </div>\n    </div>\n</div>\n<div class=\"modal fade\" id=\"itemCountModal\" tabindex=\"-1\" aria-labelledby=\"itemCountModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h1 class=\"modal-title title\" id=\"itemCountModalLabel\">CONFIGURE ITEM COUNTS</h1>\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"container-fluid\">\n                    <p>\n                        Configure the total amount of items for some item types that will be placed into the world. Items that aren't shuffled will be reset back to their default value.<br />\n                        <strong id=\"item_count_collective\">The collective total must be less than 298</strong>.\n                    </p>\n                    <div class=\"d-flex flex-wrap justify-content-center\">\n                        ";
var t_1;
t_1 = [{"name": "Golden Bananas","default_value": 201,"min_value": 40,"setting": "total_gbs","effect": "Alters the total amount of Golden Bananas placed into the world.\nMinimum: 40.\nMaximum: 255"},{"name": "Banana Medals","default_value": 40,"min_value": 1,"setting": "total_medals","effect": "Alters the total amount of Banana Medals placed into the world.\nMinimum: 1.\nMaximum: 255"},{"name": "Banana Fairies","default_value": 20,"min_value": 1,"setting": "total_fairies","effect": "Alters the total amount of Banana Fairies placed into the world.\nMinimum: 1.\nMaximum: 255"},{"name": "Battle Crowns","default_value": 10,"min_value": 0,"setting": "total_crowns","effect": "Alters the total amount of Battle Crowns placed into the world.\nMinimum: 0.\nMaximum: 255"},{"name": "Rainbow Coins","default_value": 16,"min_value": 0,"setting": "total_rainbow_coins","effect": "Alters the total amount of Rainbow Coins placed into the world.\nMinimum: 0.\nMaximum: 255"},{"name": "Pearls","default_value": 5,"min_value": 1,"setting": "total_pearls","effect": "Alters the total amount of Pearls placed into the world.\nMinimum: 1.\nMaximum: 255"}];
frame.set("item_list", t_1, true);
if(frame.topLevel) {
context.setVariable("item_list", t_1);
}
if(frame.topLevel) {
context.addExport("item_list", t_1);
}
output += "\n                        ";
frame = frame.push();
var t_4 = runtime.contextOrFrameLookup(context, frame, "item_list");
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
output += "\n                            <div class=\"item-select\" style=\"margin:0;flex:0;min-width:150px;\" title=\"";
output += runtime.suppressValue(runtime.memberLookup((t_5),"effect"), env.opts.autoescape);
output += "\">\n                                <p class=\"select-title\" id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_5),"setting"), env.opts.autoescape);
output += "_title\">";
output += runtime.suppressValue(runtime.memberLookup((t_5),"name"), env.opts.autoescape);
output += "</p>\n                                <input name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_5),"setting"), env.opts.autoescape);
output += "\"\n                                    id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_5),"setting"), env.opts.autoescape);
output += "\"\n                                    type=\"number\"\n                                    display_name=\"Item Placement Count - ";
output += runtime.suppressValue(runtime.memberLookup((t_5),"name"), env.opts.autoescape);
output += "\"\n                                    class=\"form-control my-3 mx-auto item-count-alterer\"\n                                    aria-label=\"Item Placement Count - ";
output += runtime.suppressValue(runtime.memberLookup((t_5),"name"), env.opts.autoescape);
output += "\"\n                                    data-toggle=\"tooltip\"\n                                    style=\"width:15%\"\n                                    min=\"";
output += runtime.suppressValue(runtime.memberLookup((t_5),"min_value"), env.opts.autoescape);
output += "\"\n                                    max=\"255\"\n                                    value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_5),"default_value"), env.opts.autoescape);
output += "\"\n                                />\n                            </div>\n                        ";
;
}
}
frame = frame.pop();
output += "\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"item_count_reset_default\">Reset to default</button>\n                <button type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>\n<script>\n    document.getElementById(\"item_count_reset_default\").addEventListener(\"click\", (e) => {\n        Object.keys(default_item_counts).forEach(stg => {\n            document.getElementById(stg).value = default_item_counts[stg];\n        })\n        getTotalItemCounts();\n        refreshItemRandoSortable();\n    })\n</script>";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["complex-options/kong-models.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"form-check form-switch item-switch\">\n    <label data-toggle=\"tooltip\"\n            title=\"Customize the models tied to kongs.\">\n        Kong Models\n    </label>\n    <input class=\"customize\"\n        type=\"button\"\n        href=\"#\"\n        id=\"kongModalActivator\"\n        data-bs-toggle=\"modal\"\n        data-bs-target=\"#kongModelModal\"\n        data-toggle=\"modal\"\n        title=\"Customize what models each Kong gets\"/>\n</div>\n<div class=\"modal fade\" id=\"kongModelModal\" tabindex=\"-1\" aria-labelledby=\"kongModelModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h1 class=\"modal-title title\" id=\"kongModelModalLabel\">KONG MODELS</h1>\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"container-fluid\">\n                    <div class=\"flex-container\">\n                        ";
var t_1;
t_1 = ["DK","Diddy","Lanky","Tiny","Chunky"];
frame.set("kong_lst", t_1, true);
if(frame.topLevel) {
context.setVariable("kong_lst", t_1);
}
if(frame.topLevel) {
context.addExport("kong_lst", t_1);
}
output += "\n                        ";
frame = frame.push();
var t_4 = runtime.contextOrFrameLookup(context, frame, "kong_lst");
if(t_4) {t_4 = runtime.fromIterator(t_4);
var t_3 = t_4.length;
for(var t_2=0; t_2 < t_4.length; t_2++) {
var t_5 = t_4[t_2];
frame.set("kong", t_5);
frame.set("loop.index", t_2 + 1);
frame.set("loop.index0", t_2);
frame.set("loop.revindex", t_3 - t_2);
frame.set("loop.revindex0", t_3 - t_2 - 1);
frame.set("loop.first", t_2 === 0);
frame.set("loop.last", t_2 === t_3 - 1);
frame.set("loop.length", t_3);
output += "\n                            <div class=\"item-select\">   \n                                <p class=\"select-title\">";
output += runtime.suppressValue(t_5, env.opts.autoescape);
output += "</p>\n                                <select name=\"kong_model_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_5), env.opts.autoescape);
output += "\"\n                                        id=\"kong_model_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_5), env.opts.autoescape);
output += "\"\n                                        display_name=\"Kong Model - ";
output += runtime.suppressValue(t_5, env.opts.autoescape);
output += "\"\n                                        class=\"form-select\"\n                                        aria-label=\"";
output += runtime.suppressValue(t_5, env.opts.autoescape);
output += "\">\n                                    <option selected value=\"default\">\n                                        Default\n                                    </option>\n                                    <option value=\"krusha\">\n                                        Krusha\n                                    </option>\n                                    ";
output += "\n                                </select>\n                            </div>\n                        ";
;
}
}
frame = frame.pop();
output += "\n                        <div class=\"item-select\">   \n                                <p class=\"select-title\">Random Model Mode</p>\n                                <select name=\"kong_model_mode\"\n                                        id=\"kong_model_mode\"\n                                        display_name=\"Model Replacement Mode\"\n                                        class=\"form-select\"\n                                        aria-label=\"mode\">\n                                    <option selected value=\"none\"\n                                            title=\"Use the default model for each Kong\">\n                                        None\n                                    </option>\n                                    <option selected value=\"manual\"\n                                            title=\"Manually select the model for each Kong\">\n                                        Manual\n                                    </option>\n                                    <option value=\"random_one\"\n                                            title=\"Replace one of the Kong with Krusha\">\n                                        Random One\n                                    </option>\n                                    <option value=\"sometimes_one\"\n                                            title=\"Give a 50% chance to replace one of the Kong with Krusha\">\n                                        Sometimes One\n                                    </option>\n                                    <option value=\"random_all\"\n                                            title=\"Randomly give a 50% chance to replace each Kong with Krusha\">\n                                        Random All\n                                    </option>\n                                </select>\n                            </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["complex-options/logic-toggle.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("dropdown_multiselector.html", false, "complex-options/logic-toggle.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "dropdown_multiselector")) {
var t_4 = t_1.dropdown_multiselector;
} else {
cb(new Error("cannot import 'dropdown_multiselector'")); return;
}
context.setVariable("dropdown_multiselector", t_4);
output += "\n<div class=\"item-select\">\n    <p class=\"select-title\">Logic</p>\n    <div class=\"customize-select\">\n        <select name=\"logic_type\"\n                id=\"logic_type\"\n                display_name=\"Logic\"\n                class=\"form-select\"\n                aria-label=\"Logic\"\n                data-toggle=\"tooltip\"\n                title=\"Modifies the considerations logic makes when generating your seed\">\n            <option id=\"glitchless\" selected value=\"glitchless\" title=\"Seed is beatable without performing any glitches or complex movement tech.\">\n                Glitchless Logic\n            </option>\n            <option id=\"advanced_glitchless\" value=\"advanced_glitchless\" title=\"Seed is beatable, but requires usage of advanced techniques to complete. To modify which techniques will be considered, use the cog icon to the right.\">\n                Advanced Glitchless Logic\n            </option>\n            <option id=\"glitch\" value=\"glitch\" title=\"Seed is beatable, but requires usage of glitches or movement techniques to complete. To modify which glitches and techniques will be considered, use the cog icon to the right.\">\n                Glitch Logic\n            </option>\n            <option\n                id=\"minimal\"\n                value=\"minimal\"\n                title=\"Seed will only check for a few restrictions, but otherwise follows the same considerations as No Logic:&#10;- Key 5 can't be in Level 7 (excluding Loading Zone Entrance Randomizers)&#10;- Kongs can't be in their own shop purchases.&#10;- Baboon Blast cannot be inside a Baboon Blast course or DK Arcade\">\n                Minimal Logic\n            </option>\n            <option id=\"nologic\" value=\"nologic\" title=\"The seed does not verify that the seed is beatable at all, nor makes any logical considerations during the creation of the seed. This has a high potential to generate unbeatable seeds.\">\n                No Logic\n            </option>\n        </select>\n        <div style=\"padding: 5px;\">\n            <input class=\"customize\"\n                type=\"button\"\n                href=\"#\"\n                id=\"glitches_modal\"\n                data-bs-toggle=\"modal\"\n                data-bs-target=\"#glitches_Modal\"\n                data-toggle=\"tooltip\"\n                title=\"This will open a popup that will let you customize what tricks are considered by logic with glitch logic.&#10;This defaults to All options.\"/>\n        </div>\n    </div>\n</div>\n<div class=\"modal fade\"\n     id=\"glitches_Modal\"\n     tabindex=\"-1\"\n     aria-labelledby=\"glitches_ModalLabel\"\n     aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h3 class=\"modal-title title\" id=\"glitches_ModalLabel\">TRICKS & GLITCHES</h3>\n                <button type=\"button\"\n                        class=\"btn-close\"\n                        data-bs-dismiss=\"modal\"\n                        aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"d-flex\">\n                    <div style=\"width: 50%\" class=\"mx-auto\">\n                        ";
output += runtime.suppressValue((lineno = 59, colno = 49, runtime.callWrap(t_4, "dropdown_multiselector", context, [runtime.contextOrFrameLookup(context, frame, "tricks"),"tricks","Tricks","This will open a popup that will let you customize what tricks are enabled.",2])), env.opts.autoescape);
output += "\n                    </div>\n                    <div style=\"width: 50%\" class=\"mx-auto\" id=\"glitches_multiselector\">\n                        ";
output += runtime.suppressValue((lineno = 62, colno = 49, runtime.callWrap(t_4, "dropdown_multiselector", context, [runtime.contextOrFrameLookup(context, frame, "glitches"),"glitches","Glitches","This will open a popup that will let you customize what glitches are enabled.",2])), env.opts.autoescape);
output += "\n                    </div>                   \n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["complex-options/prog-slam-strength.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"form-check form-switch item-switch\">\n    <label data-toggle=\"tooltip\"\n            title=\"Simian Slam switches will be adjusted to match the level order so that tougher switches will always be in later levels. By default, the first four levels will have green switches, the next two will have blue and the final level will have red switches. In Loading Zone Entrance Randomizers, these are assigned to random levels with no regard for level order.\">\n        <input class=\"form-check-input\"\n                type=\"checkbox\"\n                id=\"alter_switch_allocation\"\n                name=\"alter_switch_allocation\"\n                display_name=\"Progressive Switch Strength\"\n                value=\"True\"/>\n        Progressive Switch Strength\n    </label>\n    <input class=\"customize\"\n        type=\"button\"\n        href=\"#\"\n        id=\"slamModalActivator\"\n        data-bs-toggle=\"modal\"\n        data-bs-target=\"#slamModal\"\n        data-toggle=\"modal\"\n        title=\"Customize what levels get what slams\"/>\n</div>\n<div class=\"modal fade\" id=\"slamModal\" tabindex=\"-1\" aria-labelledby=\"slamModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h1 class=\"modal-title title\" id=\"slamModalLabel\">Progressive Slam Requirements</h1>\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"container-fluid\">\n                    <div class=\"row row-cols-2\">\n                        ";
frame = frame.push();
var t_3 = (lineno = 30, colno = 41, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [0,8]));
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("i", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n                            <div class=\"col\">\n                                <div class=\"item-select\">\n                                    <p class=\"select-title\">Level ";
output += runtime.suppressValue(t_4 + 1, env.opts.autoescape);
output += " Slam</p>\n                                    <select name=\"prog_slam_level_";
output += runtime.suppressValue(t_4 + 1, env.opts.autoescape);
output += "\"\n                                            id=\"prog_slam_level_";
output += runtime.suppressValue(t_4 + 1, env.opts.autoescape);
output += "\"\n                                            class=\"form-select\"\n                                            aria-label=\"Randomization type\"\n                                            display_name=\"Level ";
output += runtime.suppressValue(t_4 + 1, env.opts.autoescape);
output += " Slam\"\n                                            data-toggle=\"tooltip\"\n                                            title=\"Slam level tied to level ";
output += runtime.suppressValue(t_4 + 1, env.opts.autoescape);
output += ".\">\n                                        <option id=\"green\" ";
if(t_4 < 4) {
output += "selected";
;
}
output += " value=\"green\">\n                                            Green\n                                        </option>\n                                        <option id=\"blue\" ";
if(t_4 > 3 && t_4 < 6) {
output += "selected";
;
}
output += " value=\"blue\">\n                                            Blue\n                                        </option>\n                                        <option id=\"red\" ";
if(t_4 > 5) {
output += "selected";
;
}
output += " value=\"red\">\n                                            Red\n                                        </option>\n                                        <option id=\"random\" value=\"random\">\n                                            Random\n                                        </option>\n                                    </select>\n                                </div>\n                            </div>\n                        ";
;
}
}
frame = frame.pop();
output += "\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"progslam-reset-vanilla\">Reset to Vanilla</button>\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"progslam-reset-random\">Set to Random</button>\n                <button type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>\n<script type=\"text/javascript\">\n    function resetToState(state) {\n        for (let i = 0; i < 8; i++) {\n            let default_value = \"green\";\n            if (state == \"random\") {\n                default_value = \"random\";\n            } else {\n                if (i > 5) {\n                    default_value = \"red\";\n                } else if (i > 3) {\n                    default_value = \"blue\";\n                }\n            }\n            document.getElementById(`prog_slam_level_${i + 1}`).value = default_value;\n        }\n    }\n\n    document.getElementById(\"progslam-reset-vanilla\").addEventListener(\"click\", (e) => {\n        resetToState(\"vanilla\");\n    })\n    document.getElementById(\"progslam-reset-random\").addEventListener(\"click\", (e) => {\n        resetToState(\"random\");\n    })\n</script>";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["complex-options/switchsanity.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("macros.html", false, "complex-options/switchsanity.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "switchsanity_option")) {
var t_4 = t_1.switchsanity_option;
} else {
cb(new Error("cannot import 'switchsanity_option'")); return;
}
context.setVariable("switchsanity_option", t_4);
output += "\n<div class=\"form-check form-switch item-switch\">\n    <label data-toggle=\"tooltip\"\n            title=\"Randomizes various pads and switches in the game to other pads or switches, resulting in different requirements to access various areas.\">\n        <input class=\"form-check-input\"\n                type=\"checkbox\"\n                id=\"switchsanity_enabled\"\n                name=\"switchsanity_enabled\"\n                display_name=\"Switchsanity\"\n                value=\"True\"/>\n        Switchsanity\n    </label>\n    <input class=\"customize\"\n        type=\"button\"\n        href=\"#\"\n        id=\"switchModalActivator\"\n        data-bs-toggle=\"modal\"\n        data-bs-target=\"#switchModal\"\n        data-toggle=\"modal\"\n        title=\"Customize the switch requirements for each switch in the game.\"/>\n</div>\n<div class=\"modal fade\" id=\"switchModal\" tabindex=\"-1\" aria-labelledby=\"switchModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h1 class=\"modal-title title\" id=\"switchModalLabel\">Switchsanity Requirements</h1>\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <ul class=\"nav nav-tabs\">\n                    <li class=\"nav-item\">\n                        <a id=\"ssanity-isles-tab\" data-bs-toggle=\"tab\" data-bs-target=\"#ssanity-isles-tab-page\" type=\"button\" role=\"tab\" aria-controls=\"ssanity-isles-tab-page\" class=\"nav-link active\" aria-current=\"page\">Isles</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a id=\"ssanity-japes-tab\" data-bs-toggle=\"tab\" data-bs-target=\"#ssanity-japes-tab-page\" type=\"button\" role=\"tab\" aria-controls=\"ssanity-japes-tab-page\" class=\"nav-link\">Japes</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a id=\"ssanity-aztec-tab\" data-bs-toggle=\"tab\" data-bs-target=\"#ssanity-aztec-tab-page\" type=\"button\" role=\"tab\" aria-controls=\"ssanity-aztec-tab-page\" class=\"nav-link\">Aztec</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a id=\"ssanity-galleon-tab\" data-bs-toggle=\"tab\" data-bs-target=\"#ssanity-galleon-tab-page\" type=\"button\" role=\"tab\" aria-controls=\"ssanity-galleon-tab-page\" class=\"nav-link\">Galleon</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a id=\"ssanity-fungi-tab\" data-bs-toggle=\"tab\" data-bs-target=\"#ssanity-fungi-tab-page\" type=\"button\" role=\"tab\" aria-controls=\"ssanity-fungi-tab-page\" class=\"nav-link\">Forest</a>\n                    </li>\n                </ul>\n                <div class=\"tab-content\" id=\"myTabContent\">\n                    <div class=\"tab-pane fade show active\" id=\"ssanity-isles-tab-page\" role=\"tabpanel\" aria-labelledby=\"ssanity-isles-tab\" tabindex=\"0\">\n                        <div class=\"container-fluid\">\n                            <div class=\"row row-cols-2\">\n                                ";
output += runtime.suppressValue((lineno = 50, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["To top of Kroc Isle","switchsanity_switch_isles_to_kroc_top","mport_to_helm","tiny"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 51, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["In Helm Lobby","switchsanity_switch_isles_helm_lobby","gone_to_helm","chunky"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 52, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Aztec Lobby Back Room","switchsanity_switch_isles_aztec_lobby_back_room","guns","tiny"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 53, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Forest Lobby Fairy Door","switchsanity_switch_isles_fungi_lobby_fairy","guns","tiny"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 54, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Spawn Cabin Isles Rocketbarrel","switchsanity_switch_isles_spawn_rocketbarrel","instruments","lanky"])), env.opts.autoescape);
output += "\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"tab-pane fade\" id=\"ssanity-japes-tab-page\" role=\"tabpanel\" aria-labelledby=\"ssanity-japes-tab\" tabindex=\"0\">\n                        <div class=\"container-fluid\">\n                            <div class=\"row row-cols-2\">\n                                ";
output += runtime.suppressValue((lineno = 61, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Free Kong","switchsanity_switch_japes_free_kong","guns","donkey"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 62, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["To Hive Area","switchsanity_switch_japes_to_hive","guns","tiny"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 63, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["To Starting Tunnel Cavern","switchsanity_switch_japes_to_cavern","guns","diddy"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 64, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["To Painting Room","switchsanity_switch_japes_to_painting_room","guns","diddy"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 65, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["To Rambi","switchsanity_switch_japes_to_rambi","guns","donkey"])), env.opts.autoescape);
output += "\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"tab-pane fade\" id=\"ssanity-aztec-tab-page\" role=\"tabpanel\" aria-labelledby=\"ssanity-aztec-tab\" tabindex=\"0\">\n                        <div class=\"container-fluid\">\n                            <div class=\"row row-cols-2\">\n                                ";
output += runtime.suppressValue((lineno = 72, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Tiny Temple Kong Freeing","switchsanity_switch_aztec_free_tiny","free_tiny","diddy"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 73, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Llama Temple Kong Freeing","switchsanity_switch_aztec_free_lanky","free_lanky","donkey"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 74, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Starting Tunnel Kasplat Room","switchsanity_switch_aztec_to_kasplat_room","guns","donkey"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 75, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Door to Connector Tunnel","switchsanity_switch_aztec_to_connector_tunnel","instruments","diddy"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 76, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Llama Temple Entry (Front)","switchsanity_switch_aztec_llama_front","guns","donkey"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 77, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Llama Temple Entry (Side)","switchsanity_switch_aztec_llama_side","guns","lanky"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 78, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Llama Temple Entry (Back)","switchsanity_switch_aztec_llama_back","guns","tiny"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 79, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Door to Sand Tunnel","switchsanity_switch_aztec_sand_tunnel","kong","donkey"])), env.opts.autoescape);
output += "\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"tab-pane fade\" id=\"ssanity-galleon-tab-page\" role=\"tabpanel\" aria-labelledby=\"ssanity-galleon-tab\" tabindex=\"0\">\n                        <div class=\"container-fluid\">\n                            <div class=\"row row-cols-2\">\n                                ";
output += runtime.suppressValue((lineno = 86, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Lighthouse Switches","switchsanity_switch_galleon_to_lighthouse_side","guns","donkey"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 87, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Shipwreck Switches","switchsanity_switch_galleon_to_shipwreck_side","guns","diddy"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 88, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Cannon Game Switches","switchsanity_switch_galleon_to_cannon_game","guns","chunky"])), env.opts.autoescape);
output += "\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"tab-pane fade\" id=\"ssanity-fungi-tab-page\" role=\"tabpanel\" aria-labelledby=\"ssanity-fungi-tab\" tabindex=\"0\">\n                        <div class=\"container-fluid\">\n                            <div class=\"row row-cols-2\">\n                                ";
output += runtime.suppressValue((lineno = 95, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Yellow Tunnel","switchsanity_switch_fungi_yellow_tunnel","guns","lanky"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 96, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Green Tunnel (Clock-side pair)","switchsanity_switch_fungi_green_tunnel_near","guns","tiny"])), env.opts.autoescape);
output += "\n                                ";
output += runtime.suppressValue((lineno = 97, colno = 54, runtime.callWrap(t_4, "switchsanity_option", context, ["Green Tunnel (Worm-side pair)","switchsanity_switch_fungi_green_tunnel_far","guns","chunky"])), env.opts.autoescape);
output += "\n                            </div>\n                        </div>\n                    </div>\n                </div>                            \n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"ssanity-reset-vanilla\">Reset to Vanilla</button>\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"ssanity-reset-random\">Set to Random</button>\n                <button type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>";
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
output += "\n";
env.getTemplate("dropdown_multiselector.html", false, "cosmetics.html", false, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
t_6.getExported(function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
if(Object.prototype.hasOwnProperty.call(t_6, "dropdown_multiselector")) {
var t_9 = t_6.dropdown_multiselector;
} else {
cb(new Error("cannot import 'dropdown_multiselector'")); return;
}
context.setVariable("dropdown_multiselector", t_9);
output += "\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div id=\"override_div\"\n         class=\"form-check form-switch item-switch center-flex\"\n         hidden>\n        <label data-toggle=\"tooltip\"\n               title=\"Use Cosmetics set on UI instead of from the patch file.\">\n            <input class=\"form-check-input\"\n                   type=\"checkbox\"\n                   name=\"override_cosmetics\"\n                   id=\"override_cosmetics\"\n                   value=\"True\"\n                   display_name=\"Override Default Cosmetics\"\n                   checked/>\n            Override Default Cosmetics\n        </label>\n    </div>\n    <div class=\"row\">\n        <div class=\"col border panel\">\n            <div class=\"row\">\n                <h2 class=\"title\">MISCELLANEOUS</h2>\n                <div class=\"flex-container\">\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">D-Pad Display</p>\n                        <select name=\"dpad_display\"\n                                id=\"dpad_display\"\n                                display_name=\"D-Pad Display\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Randomization type\"\n                                data-toggle=\"tooltip\"\n                                title=\"Displays a D-pad overlay for Tag Anywhere and a Homing Ammo Toggle.\">\n                            <option selected value=\"off\">\n                                Off\n                            </option>\n                            <option value=\"on\">\n                                On\n                            </option>\n                            <option value=\"minimal\">\n                                Minimalistic\n                            </option>\n                        </select>\n                    </div>\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">Random Models</p>\n                        <select name=\"random_models\"\n                                id=\"random_models\"\n                                display_name=\"Random Models\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Random Models\"\n                                data-toggle=\"tooltip\"\n                                title=\"Changes various models in the game\">\n                            <option selected id=\"off\" value=\"off\" title=\"\">\n                                Off\n                            </option>\n                            <option id=\"random\" value=\"random\">\n                                Random\n                            </option>\n                            <option id=\"extreme\" value=\"extreme\">\n                                Extreme\n                            </option>\n                        </select>\n                    </div>\n                    ";
output += runtime.suppressValue((lineno = 63, colno = 45, runtime.callWrap(t_9, "dropdown_multiselector", context, [runtime.contextOrFrameLookup(context, frame, "random_colors"),"random_colors","Random Colors","This will open a popup that will let you customize what songs are disabled.",10])), env.opts.autoescape);
output += "\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">Head Size</p>\n                        <select name=\"big_head_mode\"\n                                id=\"big_head_mode\"\n                                display_name=\"Head Size\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Head Size\"\n                                data-toggle=\"tooltip\"\n                                title=\"Changes the size of the various character's head to be bigger or smaller than usual\">\n                            <option selected id=\"off\" value=\"off\" title=\"\">\n                                Regular\n                            </option>\n                            <option id=\"big\" value=\"big\">\n                                Big Head Mode\n                            </option>\n                            <option id=\"small\" value=\"small\">\n                                Small Head Mode\n                            </option>\n                            <option id=\"random\" value=\"random\">\n                                Random Head Size\n                            </option>\n                        </select>\n                    </div>\n                    <div class=\"item-color-select\">\n                        <div class=\"color-selector\">\n                            <p class=\"select-title\">Golden Banana Skin Color</p>\n                            <div id=\"gb_custom\">\n                                <div class=\"input-group mb-3 gbColorPicker\" style=\"display:flex\">\n                                    <select name=\"gb_colors\" id=\"gb_colors\" class=\"form-select\" aria-label=\"GB Skin\">\n                                        <option selected value=\"vanilla\">Vanilla</option>\n                                        <option value=\"randomized\">Randomized</option>\n                                        <option value=\"custom\">Custom</option>\n                                    </select>\n                                    <div class=\"color-input-container\">\n                                        <input type=\"color\"\n                                            name=\"gb_custom_color\"\n                                            id=\"gb_custom_color\"\n                                            default=\"#000000\"\n                                            class=\"color-input\">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"flex-container\">\n                    ";
output += runtime.suppressValue((lineno = 110, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["misc_cosmetics","Random Miscellaneous Cosmetics","Randomizes miscellaneous cosmetic elements, including:&#10;- Peril Path Panic/Searchlight Seek Klaptraps&#10;- Skybox colors"])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 111, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["dark_mode_textboxes","Dark Mode UI","Text bubbles will be darkened, with the font brightened. The D-Pad Display will also be darkened."])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 112, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["pause_hint_coloring","Color Hints in Pause Menu","Various important segments in hints on the pause menu will be colored to assist with parsing.",runtime.contextOrFrameLookup(context, frame, "True")])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 113, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["disco_donkey","Disco DK","Gives DK a disco outfit in the style of DitzyFlama's DK Rap Remixes. Will only work if his model is set to regular DK."])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 114, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["disco_chunky","Disco Chunky","Gives Chunky his disco outfit. Will only work if his model is set to regular chunky."])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 115, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["smoother_camera","Smoother Camera","Controlling the camera with the C Buttons behaves closer to how Banjo-Tooie operates."])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 116, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["song_speed_near_win","Speed up song near Win Condition","Speeds up the music when you are 1 item away from your win condition. ONLY works for item count based win conditions and Beat K Rool (where it speeds up upon picking up your 8th key)."])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 117, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["disable_flavor_text","Disable Flavor Text","Disables special item preview text that is stylized to sound in-line with how certain NPCs talk. Instead, the item names will be just the plain names."])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 118, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["rainbow_ammo","Rainbow Ammo","Ammo will slowly change color overtime."])), env.opts.autoescape);
output += "\n                    <div class=\"spacer\"></div>\n                    <div class=\"form-check form-switch item-switch holiday\" data-toggle=\"tooltip\"\n                        title=\"Happy Holidays from the DK64 Randomizer dev team. Limited time option.\">\n                        <input\n                            class=\"form-check-input\"\n                            type=\"checkbox\"\n                            role=\"switch\"\n                            name=\"holiday_setting\"\n                            id=\"holiday_setting\"\n                            display_name=\"Holiday Mode\"\n                            value=\"True\" />\n                        <label class=\"form-check-label\" for=\"holiday_setting\">Holiday Mode</label>\n                    </div>\n                    <div class=\"spacer holiday\"></div>\n                    ";
output += "\n                </div>\n            </div>\n            <hr />\n            <div class=\"row\">\n                <h2 class=\"title\">ACCESSIBILITY</h2>\n                <div class=\"flex-container\">\n                    ";
output += runtime.suppressValue((lineno = 153, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["remove_water_oscillation","Remove Water Oscillation","Remove water oscillation effects and the seasick ship rocking effect. For those who feel motion sick from these effects."])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 154, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["head_balloons","Kong Head on Balloons","Adds kong faces to balloons, making them easier to distinguish in various lighting conditions.",runtime.contextOrFrameLookup(context, frame, "True")])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 155, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["troff_brighten","Brighten Boss Door Opening",runtime.memberLookup(("Increased the lighting in Troff 'n' Scoff rooms to better see the item previewed in the opened Boss door."),"True")])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 156, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["better_dirt_patch_cosmetic","Higher contrast dirt patches",runtime.memberLookup(("Added red and yellow DK letters to dirt patches to better see them against the environment."),"True")])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 157, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["crosshair_outline","Outlined Crosshair","The crosshair used in various situations, like shooting your gun, will have a black outline."])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 158, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["fps_display","FPS Display","Displays an FPS counter tracked by the game itself."])), env.opts.autoescape);
output += "\n                    <div class=\"spacer\"></div>\n                </div>\n                <div class=\"flex-container\">\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">\n                            Colorblind Mode\n                        </p>\n                        <select name=\"colorblind_mode\"\n                                id=\"colorblind_mode\"\n                                display_name=\"Colorblind Mode\"\n                                class=\"form-select\"\n                                aria-label=\"Colorblind Mode\"\n                                title=\"Adjusts the colors of Kong-Specific items to be more visible with players with colorblindness.\">\n                            <option selected value=\"off\">\n                                Off\n                            </option>\n                            <option value=\"prot\">\n                                Red-Green (Protan)\n                            </option>\n                            <option value=\"deut\">\n                                Red-Green (Deutan)\n                            </option>\n                            <option value=\"trit\">\n                                Blue-Yellow (Tritan)\n                            </option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col border panel\">\n            <h2 class=\"title\">COLORS\n                <label data-toggle=\"tooltip\"\n                        title=\"Randomizes all Kong and Transformation Colors.\">\n                    <input class=\"dice_checkbox\"\n                            type=\"checkbox\"\n                            name=\"random_kong_colors\"\n                            id=\"random_kong_colors\"\n                            value=\"True\"/>\n                    <label for=\"random_kong_colors\"></label>\n                </label>\n            </h2>\n            <div class=\"flex-container\">\n                ";
frame = frame.push();
var t_12 = runtime.contextOrFrameLookup(context, frame, "kong_zones");
if(t_12) {t_12 = runtime.fromIterator(t_12);
var t_10;
if(runtime.isArray(t_12)) {
var t_11 = t_12.length;
for(t_10=0; t_10 < t_12.length; t_10++) {
var t_13 = t_12[t_10][0];
frame.set("[object Object]", t_12[t_10][0]);
var t_14 = t_12[t_10][1];
frame.set("[object Object]", t_12[t_10][1]);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
output += "\n                    <div class=\"flex-container\" style=\"flex-direction:column\">\n                        <div class=\"item-color-select\">\n                            <div class=\"color-selector\">\n                                <p class=\"select-title\">";
output += runtime.suppressValue(t_13, env.opts.autoescape);
output += "</p>\n                                ";
frame = frame.push();
var t_17 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "kong_zones")),t_13);
if(t_17) {t_17 = runtime.fromIterator(t_17);
var t_16 = t_17.length;
for(var t_15=0; t_15 < t_17.length; t_15++) {
var t_18 = t_17[t_15];
frame.set("zone", t_18);
frame.set("loop.index", t_15 + 1);
frame.set("loop.index0", t_15);
frame.set("loop.revindex", t_16 - t_15);
frame.set("loop.revindex0", t_16 - t_15 - 1);
frame.set("loop.first", t_15 === 0);
frame.set("loop.last", t_15 === t_16 - 1);
frame.set("loop.length", t_16);
output += "\n                                    <div id=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_13), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_18), env.opts.autoescape);
output += "_custom\">\n                                        <div class=\"input-group mb-3 ";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_13), env.opts.autoescape);
output += runtime.suppressValue(env.getFilter("lower").call(context, t_18), env.opts.autoescape);
output += "ColorPicker\" style=\"display:flex\">\n                                            <select name=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_13), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_18), env.opts.autoescape);
output += "_colors\" id=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_13), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_18), env.opts.autoescape);
output += "_colors\" class=\"form-select\" aria-label=\"";
output += runtime.suppressValue(t_13, env.opts.autoescape);
output += " ";
output += runtime.suppressValue(t_18, env.opts.autoescape);
output += "\">\n                                                <option selected value=\"vanilla\">";
output += runtime.suppressValue(t_18, env.opts.autoescape);
output += ": Vanilla</option>\n                                                <option value=\"randomized\">";
output += runtime.suppressValue(t_18, env.opts.autoescape);
output += ": Randomized</option>\n                                                <option value=\"custom\">";
output += runtime.suppressValue(t_18, env.opts.autoescape);
output += ": Custom</option>\n                                            </select>\n                                            <div class=\"color-input-container\">\n                                                <input type=\"color\"\n                                                    name=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_13), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_18), env.opts.autoescape);
output += "_custom_color\"\n                                                    id=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_13), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_18), env.opts.autoescape);
output += "_custom_color\"\n                                                    default=\"#000000\"\n                                                    class=\"color-input\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                ";
;
}
}
frame = frame.pop();
output += "\n                            </div>\n                        </div>\n                    </div>\n                ";
;
}
} else {
t_10 = -1;
var t_11 = runtime.keys(t_12).length;
for(var t_19 in t_12) {
t_10++;
var t_20 = t_12[t_19];
frame.set("kong", t_19);
frame.set("object_data", t_20);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
output += "\n                    <div class=\"flex-container\" style=\"flex-direction:column\">\n                        <div class=\"item-color-select\">\n                            <div class=\"color-selector\">\n                                <p class=\"select-title\">";
output += runtime.suppressValue(t_19, env.opts.autoescape);
output += "</p>\n                                ";
frame = frame.push();
var t_23 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "kong_zones")),t_19);
if(t_23) {t_23 = runtime.fromIterator(t_23);
var t_22 = t_23.length;
for(var t_21=0; t_21 < t_23.length; t_21++) {
var t_24 = t_23[t_21];
frame.set("zone", t_24);
frame.set("loop.index", t_21 + 1);
frame.set("loop.index0", t_21);
frame.set("loop.revindex", t_22 - t_21);
frame.set("loop.revindex0", t_22 - t_21 - 1);
frame.set("loop.first", t_21 === 0);
frame.set("loop.last", t_21 === t_22 - 1);
frame.set("loop.length", t_22);
output += "\n                                    <div id=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_19), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_24), env.opts.autoescape);
output += "_custom\">\n                                        <div class=\"input-group mb-3 ";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_19), env.opts.autoescape);
output += runtime.suppressValue(env.getFilter("lower").call(context, t_24), env.opts.autoescape);
output += "ColorPicker\" style=\"display:flex\">\n                                            <select name=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_19), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_24), env.opts.autoescape);
output += "_colors\" id=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_19), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_24), env.opts.autoescape);
output += "_colors\" class=\"form-select\" aria-label=\"";
output += runtime.suppressValue(t_19, env.opts.autoescape);
output += " ";
output += runtime.suppressValue(t_24, env.opts.autoescape);
output += "\">\n                                                <option selected value=\"vanilla\">";
output += runtime.suppressValue(t_24, env.opts.autoescape);
output += ": Vanilla</option>\n                                                <option value=\"randomized\">";
output += runtime.suppressValue(t_24, env.opts.autoescape);
output += ": Randomized</option>\n                                                <option value=\"custom\">";
output += runtime.suppressValue(t_24, env.opts.autoescape);
output += ": Custom</option>\n                                            </select>\n                                            <div class=\"color-input-container\">\n                                                <input type=\"color\"\n                                                    name=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_19), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_24), env.opts.autoescape);
output += "_custom_color\"\n                                                    id=\"";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_19), env.opts.autoescape);
output += "_";
output += runtime.suppressValue(env.getFilter("lower").call(context, t_24), env.opts.autoescape);
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
output += runtime.suppressValue((lineno = 234, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["camera_is_not_inverted","Disable Y-Inverted First Person Camera","If enabled, the camera will look up when the player holds up on the stick, the opposite of how the vanilla game behaves."])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 235, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["camera_is_follow","Follow Cam","Camera will always follow behind the player."])), env.opts.autoescape);
output += "\n                    ";
output += runtime.suppressValue((lineno = 236, colno = 35, runtime.callWrap(t_5, "toggle_input", context, ["anamorphic_widescreen","Anamorphic Widescreen","The in-game anamorphic widescreen setting will be enabled by default."])), env.opts.autoescape);
output += "\n                    <div class=\"spacer\"></div>\n                </div>\n                <div class=\"flex-container\">\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">\n                            Sound Type\n                        </p>\n                        <select name=\"sound_type\"\n                                id=\"sound_type\"\n                                class=\"form-select\"\n                                aria-label=\"Sound Type\"\n                                title=\"Sets the in-game sound type.\">\n                            <option selected value=\"stereo\">\n                                Stereo (Default)\n                            </option>\n                            <option value=\"surround\">\n                                Surround\n                            </option>\n                            <option value=\"mono\">\n                                Mono\n                            </option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"flex-container\">\n                    <div class=\"item-group\">\n                        <p class=\"select-title\">Music Volume (%)</p>\n                        <input class=\"form-control\"\n                            min=\"0\"\n                            max=\"100\"\n                            name=\"music_volume\"\n                            id=\"music_volume\"\n                            display_name=\"Music Volume\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"Music Volume\"\n                            default=\"100\"\n                            placeholder=\"100\"/>\n                    </div>\n                    <div class=\"item-group\">\n                        <p class=\"select-title\">SFX Volume (%)</p>\n                        <input class=\"form-control\"\n                            min=\"0\"\n                            max=\"100\"\n                            name=\"sfx_volume\"\n                            id=\"sfx_volume\"\n                            display_name=\"SFX Volume\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"SFX Volume\"\n                            default=\"100\"\n                            placeholder=\"100\"/>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<script>\n    KONG_ZONES = {\n        \"DK\": [\"Fur\", \"Tie\"], \n        \"Diddy\": [\"Clothes\"], \n        \"Lanky\": [\"Clothes\", \"Fur\"], \n        \"Tiny\": [\"Clothes\", \"Hair\"], \n        \"Chunky\": [\"Main\", \"Other\"], \n        \"Rambi\": [\"Skin\"], \n        \"Enguarde\": [\"Skin\"]\n    }\n    \n    $('.nav-tabs').click(function() {\n        var settings = (document.cookie).split('saved_settings=')\n        if (typeof settings[1] !== 'undefined') {\n            var object = JSON.parse(settings[1])\n            Object.keys(KONG_ZONES).forEach(kong => {\n                KONG_ZONES[kong].forEach(zone => {\n                    const attribute = `${kong.toLowerCase()}_${zone.toLowerCase()}_custom_color`;\n                    const cls = `.${kong.toLowerCase()}${zone.toLowerCase()}ColorPicker`;\n                    if (object.hasOwnProperty(attribute)) {\n                        $(cls).attr('style', 'background-color:' + object[attribute] + ';')\n                    }\n                });\n            });\n            if (object.hasOwnProperty(\"gb_custom_color\")) {\n                $(\".gbColorPicker\").attr(\"style\", \"background-color\" + object[\"gb_custom_color\"] + \";\")\n            }\n        }\n    });\n    $(function() {\n        var pattern = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];\n        var current = 0;\n\n        var keyHandler = function (event) {\n            // If the key isn't in the pattern, or isn't the current key in the pattern, reset\n            if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {\n                current = 0;\n                return;\n            }\n            // Update how much of the pattern is complete\n            current++;\n            // If complete, remove hidden and reset\n            if (pattern.length === current) {\n                current = 0;\n                $('.holiday').removeAttr('hidden');\n            }\n        };\n        // Listen for keydown events\n        document.addEventListener('keydown', keyHandler, false);\n    });\n</script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
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
output += "\n        </div>\n        <div class=\"col border panel\">\n            <h2 class=\"title\">ENEMY POOL</h2>\n            <div class=\"flex-container\"></div>\n        </div>\n    </div>\n</div>\n<script>\n    $(function() {\n        $('[data-toggle=\"tooltip\"]').tooltip({\n            trigger: 'hover'\n        });\n    });\n</script>\n";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["dropdown_multiselector.html"] = (function() {
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
frame.set("includeDisclaimer", Object.prototype.hasOwnProperty.call(kwargs, "includeDisclaimer") ? kwargs["includeDisclaimer"] : 0);frame.set("overrideDisclaimer", Object.prototype.hasOwnProperty.call(kwargs, "overrideDisclaimer") ? kwargs["overrideDisclaimer"] : "");var t_2 = "";t_2 += "\n    <div class=\"item-select\">\n        <p class=\"select-title\">";
t_2 += runtime.suppressValue(l_title, env.opts.autoescape);
t_2 += "</p>\n        <div class=\"dropdown-multiselect\" id=\"dropdown_";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "\">\n            <!-- Visible toggle -->\n            <div class=\"dropdown-toggle\" onclick=\"toggleDropdown('";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "')\" title=\"";
t_2 += runtime.suppressValue(l_tooltip, env.opts.autoescape);
t_2 += "\">\n                <span id=\"selectedCount_";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "\">Loading Multiselector...</span>\n            </div>\n    \n            <!-- Dropdown menu -->\n            <div class=\"dropdown-menu\" name=\"";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_selected\" id=\"";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "_selected\">\n                <div class=\"d-flex\" style=\"border-bottom: 1px solid #bbb; margin-bottom: 5px; padding-bottom: 10px;\">\n                    <span class=\"mx-2 control-button user-select-none\" onclick=\"dropdownForceAll('";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "', true)\">All</span>\n                    <span class=\"mx-2 control-button user-select-none\" onclick=\"dropdownForceAll('";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "', false)\">None</span>\n                </div>\n                ";
frame = frame.push();
var t_5 = l_list;
if(t_5) {t_5 = runtime.fromIterator(t_5);
var t_4 = t_5.length;
for(var t_3=0; t_3 < t_5.length; t_3++) {
var t_6 = t_5[t_3];
frame.set("option", t_6);
frame.set("loop.index", t_3 + 1);
frame.set("loop.index0", t_3);
frame.set("loop.revindex", t_4 - t_3);
frame.set("loop.revindex0", t_4 - t_3 - 1);
frame.set("loop.first", t_3 === 0);
frame.set("loop.last", t_3 === t_4 - 1);
frame.set("loop.length", t_4);
t_2 += "\n                    <label class=\"dropdown-item\" title=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_6),"tooltip"), env.opts.autoescape);
t_2 += "\">\n                        <input type=\"checkbox\" class=\"avoid-settings-parse\" value=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((t_6),"value"), env.opts.autoescape);
t_2 += "\"\n                            onchange=\"updateSelected('";
t_2 += runtime.suppressValue(l_name, env.opts.autoescape);
t_2 += "')\"\n                            >\n                        ";
t_2 += runtime.suppressValue(runtime.memberLookup((t_6),"name"), env.opts.autoescape);
t_2 += "\n                    </label>\n                ";
;
}
}
frame = frame.pop();
t_2 += "\n            </div>\n        </div>\n    </div>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("dropdown_multiselector");
context.setVariable("dropdown_multiselector", macro_t_1);
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
output += "\n    </div>\n    <div class=\"row\">\n        <div class=\"col border pb-3\">\n            <div id=\"plandomizer_container\">\n                <h2 class=\"title\">PLANDOMIZER</h2>\n                <div class=\"pb-3\">\n                    This mode allows users to specify rewards, hints, and other settings. This is an advanced mode and is not recommended for beginners.\n                </div>\n                <div class=\"form-check form-switch\">\n                    <label>\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"enable_plandomizer\"\n                                id=\"enable_plandomizer\"\n                                display_name=\"Enable Plandomizer\"\n                                value=\"True\"/>\n                        Enable Plandomizer\n                    </label>\n                </div>\n            </div>\n        </div>\n        <div class=\"col border pb-3\"></div>\n    </div>\n</div>\n<script>\n    $(function() {\n        $('[data-toggle=\"tooltip\"]').tooltip({\n            trigger: 'hover'\n        });\n    });\n    \n    $('#presets').on('change', function() {\n        var selected = $(\"#presets option:selected\").text();\n        var selected_desc = $(\"#presets option:selected\").attr(\"title\");\n        if (selected == \"Season 3 Race Settings\") $(\"#output\").html(\"- Season 3 Race Settings: Level Order Randomizer of medium length that starts you with keys 1, 3 and item randomizer. These settings are designed to give a well-rounded experience, accessible for veterans and newcomers alike. Optimized for races.\")\n        else if (selected == \"Hell Mode\") $(\"#output\").html(\"- Hell Mode: Absolute Hell. Decoupled Loading Zone Randomizer with all randomization options on. GB and Color Banana requirements are near maxed. Hints are Cryptic and you start with 1 Kong and need all 8 keys. Moves are in randomized locations with High prices. Also bonus barrels are really neat. Have Fun.\")\n        else if (selected == \"Vanilla Game But Better\") $(\"#output\").html(\"- Vanilla Game But Better: No randomization, only the quality of life settings enabled.\")\n        else if (selected == \"Hitlist\") $(\"#output\").html(\"- Hitlist: Complete the 8 of the worst checks in the game. You will <strong>NEED</strong> this <a href='https://github.com/Brian0255/Track-O-Matic/releases/latest' style='text-decoration:underline'>tracker</a> and read the specialized <a href='https://docs.google.com/document/d/1V2jj3bT18fTIuEbuqYDDC8pePBFSpVd_U__p2AvcNlc/edit' style='text-decoration:underline'>ruleset</a>.\")\n        else $(\"#output\").html(`- ${selected}: ${selected_desc}`)\n    });\n</script>\n";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["items.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("macros.html", false, "items.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "toggle_input")) {
var t_4 = t_1.toggle_input;
} else {
cb(new Error("cannot import 'toggle_input'")); return;
}
context.setVariable("toggle_input", t_4);
output += "\n";
env.getTemplate("dropdown_multiselector.html", false, "items.html", false, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
t_5.getExported(function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
if(Object.prototype.hasOwnProperty.call(t_5, "dropdown_multiselector")) {
var t_8 = t_5.dropdown_multiselector;
} else {
cb(new Error("cannot import 'dropdown_multiselector'")); return;
}
context.setVariable("dropdown_multiselector", t_8);
output += "\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div class=\"row\">\n        <div class=\"col border panel\">\n            <h2 class=\"title\">ITEM RANDOMIZER</h2>\n            <div class=\"flex-container\">\n                <div class=\"text-start\">\n                    <p>\n                        Shuffles <span class=\"ir-hint items\">items</span><span class=\"hide-if-ir-decouple decouple-hide\"> with <span class=\"ir-hint checks\">checks</span></span> into pools.\n                        Drag and drop items <span class=\"hide-if-ir-decouple\">and checks </span>into various pools to determine where items can be placed.\n                    </p>\n                    <h5>Rules</h5>\n                    <ul>\n                        <li id=\"rule-item-shuffle\" class=\"hide-if-ir-decouple decouple-hide\">If an item or check remains unshuffled, it's corresponding item/check has to also remain unshuffled.</li>\n                        <li id=\"rule-item-count\">Check count must not be lower than item count.</li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"flex-container\">\n                <div style=\"width:50%\">\n                    <div class=\"mx-auto\" style=\"width: fit-content\">\n                        ";
output += runtime.suppressValue((lineno = 22, colno = 39, runtime.callWrap(t_4, "toggle_input", context, ["decouple_item_rando","Decouple Items from Checks","Enabling this setting decouples items from their checks, resulting in greater control over the pools."])), env.opts.autoescape);
output += "\n                    </div>\n                </div>\n                <div style=\"width:50%\">\n                    <div class=\"mx-auto\" style=\"width: fit-content\">\n                        <div class=\"item-select\">\n                            <button\n                                class=\"btn btn-secondary btn-custom-large\"\n                                type=\"button\"\n                                href=\"#\"\n                                id=\"starting_moves_modal\"\n                                display_name=\"Customize Starting Moves\"\n                                data-bs-toggle=\"modal\"\n                                data-bs-target=\"#starting_moves_Modal\"\n                                data-toggle=\"tooltip\"\n                                title=\"Customize your starting moves. Start with more items, fewer items, certain items, and more.\">\n                                Customize Starting Moves\n                                <span id=\"shared_shop_warning\" data-toggle=\"tooltip\" title=\"When all moves are purchased in shops, you are extremely likely to run into fill problems if you do not start with enough shared moves! Seeds that do generate will have fill biases - consider starting with training moves.\">\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" data-name=\"Layer 1\" viewBox=\"0 0 18 18\" class=\"warning-icon\" style=\"overflow: visible; margin-bottom: 7px;\" stroke=\"#ffff00\" fill=\"#ffff00\">\n                                        <path d=\"M14.876,2.672a3.309,3.309,0,0,0-5.752,0L.414,18.19a3.178,3.178,0,0,0,.029,3.189A3.264,3.264,0,0,0,3.29,23H20.71a3.264,3.264,0,0,0,2.847-1.621,3.178,3.178,0,0,0,.029-3.189ZM12,19a1,1,0,1,1,1-1A1,1,0,0,1,12,19Zm1-5a1,1,0,0,1-2,0V8a1,1,0,0,1,2,0Z\"/>\n                                    </svg>\n                                </span>\n                            </button>\n                        </div>\n                    </div>\n                </div>\n                <div style=\"width:50%\">\n                    <div class=\"mx-auto\" style=\"width: fit-content\">\n                        ";
output += runtime.suppressValue((lineno = 50, colno = 49, runtime.callWrap(t_8, "dropdown_multiselector", context, [runtime.contextOrFrameLookup(context, frame, "item_filler"),"filler_items","Filler Items","Defines what item types can be placed into the world after all mandatory items have been placed.","0"])), env.opts.autoescape);
output += "\n                    </div>\n                </div>\n                <div style=\"width:50%\">\n                    <div class=\"mx-auto\" style=\"width: fit-content\">\n                        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("complex-options/ice-trap.html", false, "items.html", false, function(t_10,t_9) {
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
output += "\n                    </div>\n                </div>\n                <div style=\"width:50%\">\n                    <div class=\"mx-auto\" style=\"width: fit-content\">\n                        ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("complex-options/item-totals.html", false, "items.html", false, function(t_14,t_13) {
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
output += "\n                    </div>\n                </div>\n                <div style=\"width:50%\">\n                    <div class=\"mx-auto\" style=\"width: fit-content\">\n                        <div>\n                            <p class=\"select-title\">Max Snide Reward Limit</p>\n                            <input name=\"most_snide_rewards\"\n                                    id=\"most_snide_rewards\"\n                                    type=\"number\"\n                                    display_name=\"Max Snide Reward Limit\"\n                                    class=\"form-control me-2\"\n                                    aria-label=\"Max Snide Reward Limit\"\n                                    data-toggle=\"tooltip\"\n                                    title=\"THIS IS ONLY RELEVANT IF YOU'RE SHUFFLING SNIDE REWARDS&#10;The max amount of blueprints that can be required to obtain a uncommon reward.\"\n                                    min=\"0\"\n                                    max=\"40\"\n                                    value=\"40\"\n                            />\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"d-flex\" id=\"item_rando-category-container\" data-items=\"";
output += runtime.suppressValue(env.getFilter("escape").call(context, env.getFilter("tojsonarr").call(context, runtime.contextOrFrameLookup(context, frame, "itemRando"))), env.opts.autoescape);
output += "\" data-count=\"5\" data-predicate=\"item_rando_list_\">\n                ";
frame = frame.push();
var t_19 = (lineno = 84, colno = 33, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [5]));
if(t_19) {t_19 = runtime.fromIterator(t_19);
var t_18 = t_19.length;
for(var t_17=0; t_17 < t_19.length; t_17++) {
var t_20 = t_19[t_17];
frame.set("x", t_20);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
output += "\n                <div style=\"flex:1; max-width: 20%;\">\n                    <p class=\"select-title\" style=\"margin-bottom: 0px;\">\n                        ";
if(t_20 == 0) {
output += "\n                            Unshuffled\n                        ";
;
}
else {
output += "\n                            Pool ";
output += runtime.suppressValue(t_20, env.opts.autoescape);
output += "\n                        ";
;
}
output += "\n                        <div id=\"item_rando_check_hint_";
output += runtime.suppressValue(t_20, env.opts.autoescape);
output += "\">&nbsp;<br>&nbsp;</div>\n                    </p>\n                    ";
if(t_20 == 0) {
output += "\n                    <div class=\"text-start hide-if-ir-decouple\">\n                        <h6>Items</h6>\n                    </div>\n                    ";
;
}
else {
output += "\n                    <div class=\"text-start hide-if-ir-decouple\" style=\"opacity:0\">\n                        <h6>Items</h6>\n                    </div>\n                    ";
;
}
output += "\n                    <ul id=\"item_rando_list_";
output += runtime.suppressValue(t_20, env.opts.autoescape);
output += "\" name=\"item_rando_list_";
output += runtime.suppressValue(t_20, env.opts.autoescape);
output += "\" class=\"sortablejs shared list-group bg-secondary-subtle border border-1 border-white mx-2\" style=\"height: 200px; overflow-y: scroll\">\n                        ";
if(t_20 == 0) {
output += "\n                            ";
frame = frame.push();
var t_23 = runtime.contextOrFrameLookup(context, frame, "itemRando");
if(t_23) {t_23 = runtime.fromIterator(t_23);
var t_22 = t_23.length;
for(var t_21=0; t_21 < t_23.length; t_21++) {
var t_24 = t_23[t_21];
frame.set("option", t_24);
frame.set("loop.index", t_21 + 1);
frame.set("loop.index0", t_21);
frame.set("loop.revindex", t_22 - t_21);
frame.set("loop.revindex0", t_22 - t_21 - 1);
frame.set("loop.first", t_21 === 0);
frame.set("loop.last", t_21 === t_22 - 1);
frame.set("loop.length", t_22);
output += "\n                                ";
if(!runtime.memberLookup((t_24),"is_check")) {
output += "\n                                    ";
if(runtime.memberLookup((t_24),"is_dummy")) {
output += "\n                                        <li class=\"list-group-item d-flex show-if-ir-decouple\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_24),"value"), env.opts.autoescape);
output += "\" tooltip=\"";
output += runtime.suppressValue(runtime.memberLookup((t_24),"tooltip"), env.opts.autoescape);
output += "\" check_count=\"";
output += runtime.suppressValue(runtime.memberLookup((t_24),"check_count"), env.opts.autoescape);
output += "\" items_count=\"";
output += runtime.suppressValue(runtime.memberLookup((t_24),"item_count"), env.opts.autoescape);
output += "\">\n                                            <span class=\"fs-6 d-flex\">\n                                                <i class=\"fas fa-arrows-alt handle\" style=\"height: 20px; width: 20px; padding-right: 5px\" title=\"Drag to Move\"></i>\n                                                <i class=\"fas fa-clone clone-btn\" style=\"height: 20px; width: 20px; padding-right: 5px\" title=\"Drag to clone\"></i>\n                                            </span>\n                                            <span class=\"flex-grow-1\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_24),"name"), env.opts.autoescape);
output += "\n                                            </span>\n                                        </li>\n                                    ";
;
}
else {
output += "\n                                        <li class=\"list-group-item d-flex\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_24),"value"), env.opts.autoescape);
output += "\" tooltip=\"";
output += runtime.suppressValue(runtime.memberLookup((t_24),"tooltip"), env.opts.autoescape);
output += "\" check_count=\"";
output += runtime.suppressValue(runtime.memberLookup((t_24),"check_count"), env.opts.autoescape);
output += "\" items_count=\"";
output += runtime.suppressValue(runtime.memberLookup((t_24),"item_count"), env.opts.autoescape);
output += "\">\n                                            <span class=\"fs-6 d-flex\">\n                                                <i class=\"fas fa-arrows-alt handle\" style=\"height: 20px; width: 20px; padding-right: 5px\" title=\"Drag to Move\"></i>\n                                                <i class=\"fas fa-clone clone-btn\" style=\"height: 20px; width: 20px; padding-right: 5px\" title=\"Drag to Clone\"></i>\n                                            </span>\n                                            <span class=\"flex-grow-1\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_24),"name"), env.opts.autoescape);
output += "\n                                            </span>\n                                        </li>\n                                    ";
;
}
output += "\n                                ";
;
}
output += "\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        ";
;
}
output += "\n                    </ul>\n                    ";
if(t_20 == 0) {
output += "\n                    <div class=\"text-start mt-3 hide-if-ir-decouple\">\n                        <h6>Checks</h6>\n                    </div>\n                    ";
;
}
else {
output += "\n                    <div class=\"text-start mt-3 hide-if-ir-decouple\" style=\"opacity:0\">\n                        <h6>Checks</h6>\n                    </div>\n                    ";
;
}
output += "\n                    <ul id=\"item_rando_list_";
output += runtime.suppressValue(t_20 + 5, env.opts.autoescape);
output += "\" name=\"item_rando_list_";
output += runtime.suppressValue(t_20 + 5, env.opts.autoescape);
output += "\" class=\"sortablejs sharedchecks list-group bg-secondary-subtle border border-1 border-white mx-2 hide-if-ir-decouple\" style=\"height: 200px; overflow-y: scroll\">\n                        ";
if(t_20 == 0) {
output += "\n                            ";
frame = frame.push();
var t_27 = runtime.contextOrFrameLookup(context, frame, "itemRando");
if(t_27) {t_27 = runtime.fromIterator(t_27);
var t_26 = t_27.length;
for(var t_25=0; t_25 < t_27.length; t_25++) {
var t_28 = t_27[t_25];
frame.set("option", t_28);
frame.set("loop.index", t_25 + 1);
frame.set("loop.index0", t_25);
frame.set("loop.revindex", t_26 - t_25);
frame.set("loop.revindex0", t_26 - t_25 - 1);
frame.set("loop.first", t_25 === 0);
frame.set("loop.last", t_25 === t_26 - 1);
frame.set("loop.length", t_26);
output += "\n                                ";
if(runtime.memberLookup((t_28),"is_check")) {
output += "\n                                    <li class=\"list-group-item d-flex ischeck\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_28),"value"), env.opts.autoescape);
output += "\" tooltip=\"";
output += runtime.suppressValue(runtime.memberLookup((t_28),"tooltip"), env.opts.autoescape);
output += "\" check_count=\"";
output += runtime.suppressValue(runtime.memberLookup((t_28),"check_count"), env.opts.autoescape);
output += "\" items_count=\"";
output += runtime.suppressValue(runtime.memberLookup((t_28),"item_count"), env.opts.autoescape);
output += "\" tied_item=\"";
output += runtime.suppressValue(runtime.memberLookup((t_28),"tied"), env.opts.autoescape);
output += "\">\n                                        <span class=\"fs-6 d-flex\">\n                                            <i class=\"fas fa-arrows-alt handle\" style=\"height: 20px; width: 20px; padding-right: 5px\" title=\"Drag to Move\"></i>\n                                            <i class=\"fas fa-clone clone-btn\" style=\"height: 20px; width: 20px; padding-right: 5px\" title=\"Drag to Clone\"></i>\n                                        </span>\n                                        <span class=\"flex-grow-1\">\n                                            ";
output += runtime.suppressValue(runtime.memberLookup((t_28),"name"), env.opts.autoescape);
output += "\n                                        </span>\n                                    </li>\n                                ";
;
}
output += "\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        ";
;
}
output += "\n                    </ul>\n                </div>\n                ";
;
}
}
frame = frame.pop();
output += "\n            </div>\n            <div class=\"flex-container mt-4\">\n                <button type=\"button\" class=\"btn btn-secondary mx-3\" style=\"flex: 1\" id=\"item_rando_reset\">Unshuffle All</button>\n                <button type=\"button\" class=\"btn btn-secondary mx-3\" style=\"flex: 1\" id=\"item_rando_shuffle_all\">Shuffle All</button>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"modal fade\"\n     id=\"starting_moves_Modal\"\n     tabindex=\"-1\"\n     aria-labelledby=\"starting_moves_ModalLabel\"\n     aria-hidden=\"true\">\n    <div class=\"modal-dialog\" style=\"max-width: 1250px;\">\n        <div class=\"modal-content modal-content-tall\">\n            <div class=\"modal-header\">\n                <h3 class=\"modal-title title\" id=\"starting_moves_ModalLabel\">CUSTOMIZE STARTING MOVES</h3>\n                <button type=\"button\"\n                        class=\"btn-close\"\n                        data-bs-dismiss=\"modal\"\n                        aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <b>Place your items into a number of item pools, then choose how many of each pool's items you want given to you at the start of the seed.</b>\n                <br/>\n                <b>To move items, select them from any list and click the item pool you want them to be in.</b>\n                <br/>\n                <em>Use the presets at the bottom as quick actions.</em>\n                <div class=\"flex-container\" style=\"justify-content: space-around; margin-top: 15px;\">\n                    <div id=\"starting_moves_list_column_1\" class=\"flex-column-container\">\n                        <b id=\"starting_moves_list_all_1\" style=\"font-style: italic; color: green;\">Start with All</b>\n                        <b id=\"starting_moves_list_some_1\" style=\"font-style: italic; color: orange;\">Start with Some</b>\n                        <b id=\"starting_moves_list_none_1\" style=\"font-style: italic; color: red;\">Start with None</b>\n                        <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_list_mover_1\">Pool 1</button>\n                        <select id=\"starting_moves_list_1\" name=\"starting_moves_list_1\" class=\"starting_moves_list multi-select\" multiple>\n                            ";
frame = frame.push();
var t_31 = runtime.contextOrFrameLookup(context, frame, "custom_starting_moves");
if(t_31) {t_31 = runtime.fromIterator(t_31);
var t_30 = t_31.length;
for(var t_29=0; t_29 < t_31.length; t_29++) {
var t_32 = t_31[t_29];
frame.set("item", t_32);
frame.set("loop.index", t_29 + 1);
frame.set("loop.index0", t_29);
frame.set("loop.revindex", t_30 - t_29);
frame.set("loop.revindex0", t_30 - t_29 - 1);
frame.set("loop.first", t_29 === 0);
frame.set("loop.last", t_29 === t_30 - 1);
frame.set("loop.length", t_30);
output += "\n                                <option id=\"starting_move_";
output += runtime.suppressValue(runtime.memberLookup((t_32),"value"), env.opts.autoescape);
output += "\" class=\"starting_moves_option\">";
output += runtime.suppressValue(runtime.memberLookup((t_32),"name"), env.opts.autoescape);
output += "</option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        </select>\n                        # Given:\n                        <input min=\"0\"\n                                max=\"47\"\n                                display_name=\"Move Count\"\n                                name=\"starting_moves_list_count_1\"\n                                id=\"starting_moves_list_count_1\"\n                                class=\"form-control center-div move_count_button\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Amount of moves given from this item pool.\"\n                                default=\"0\"\n                                placeholder=\"0\"\n                                />\n                    </div>\n                    <div id=\"starting_moves_list_column_2\" class=\"flex-column-container\">\n                        <b id=\"starting_moves_list_all_2\" style=\"font-style: italic; color: green;\">Start with All</b>\n                        <b id=\"starting_moves_list_some_2\" style=\"font-style: italic; color: orange;\">Start with Some</b>\n                        <b id=\"starting_moves_list_none_2\" style=\"font-style: italic; color: red;\">Start with None</b>\n                        <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_list_mover_2\">Pool 2</button>\n                        <select id=\"starting_moves_list_2\" name=\"starting_moves_list_2\" class=\"starting_moves_list multi-select\" multiple>\n                        </select>\n                        # Given:\n                        <input min=\"0\"\n                                max=\"47\"\n                                display_name=\"Move Count\"\n                                name=\"starting_moves_list_count_2\"\n                                id=\"starting_moves_list_count_2\"\n                                class=\"form-control center-div move_count_button\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Amount of moves given from this item pool.\"\n                                default=\"0\"\n                                placeholder=\"0\"\n                                />\n                    </div>\n                    <div id=\"starting_moves_list_column_3\" class=\"flex-column-container\">\n                        <b id=\"starting_moves_list_all_3\" style=\"font-style: italic; color: green;\">Start with All</b>\n                        <b id=\"starting_moves_list_some_3\" style=\"font-style: italic; color: orange;\">Start with Some</b>\n                        <b id=\"starting_moves_list_none_3\" style=\"font-style: italic; color: red;\">Start with None</b>\n                        <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_list_mover_3\">Pool 3</button>\n                        <select id=\"starting_moves_list_3\" name=\"starting_moves_list_3\" class=\"starting_moves_list multi-select\" multiple>\n                        </select>\n                        # Given:\n                        <input min=\"0\"\n                                max=\"47\"\n                                display_name=\"Move Count\"\n                                name=\"starting_moves_list_count_3\"\n                                id=\"starting_moves_list_count_3\"\n                                class=\"form-control center-div move_count_button\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Amount of moves given from this item pool.\"\n                                default=\"0\"\n                                placeholder=\"0\"\n                                />\n                    </div>\n                    <div id=\"starting_moves_list_column_4\" class=\"flex-column-container\">\n                        <b id=\"starting_moves_list_all_4\" style=\"font-style: italic; color: green;\">Start with All</b>\n                        <b id=\"starting_moves_list_some_4\" style=\"font-style: italic; color: orange;\">Start with Some</b>\n                        <b id=\"starting_moves_list_none_4\" style=\"font-style: italic; color: red;\">Start with None</b>\n                        <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_list_mover_4\">Pool 4</button>\n                        <select id=\"starting_moves_list_4\" name=\"starting_moves_list_4\" class=\"starting_moves_list multi-select\" multiple>\n                        </select>\n                        # Given:\n                        <input min=\"0\"\n                                max=\"47\"\n                                display_name=\"Move Count\"\n                                name=\"starting_moves_list_count_4\"\n                                id=\"starting_moves_list_count_4\"\n                                class=\"form-control center-div move_count_button\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Amount of moves given from this item pool.\"\n                                default=\"0\"\n                                placeholder=\"0\"\n                                />\n                    </div>\n                    <div id=\"starting_moves_list_column_5\" class=\"flex-column-container\">\n                        <b id=\"starting_moves_list_all_5\" style=\"font-style: italic; color: green;\">Start with All</b>\n                        <b id=\"starting_moves_list_some_5\" style=\"font-style: italic; color: orange;\">Start with Some</b>\n                        <b id=\"starting_moves_list_none_5\" style=\"font-style: italic; color: red;\">Start with None</b>\n                        <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_list_mover_5\">Pool 5</button>\n                        <select id=\"starting_moves_list_5\" name=\"starting_moves_list_5\" class=\"starting_moves_list multi-select\" multiple>\n                        </select>\n                        # Given:\n                        <input min=\"0\"\n                                max=\"47\"\n                                display_name=\"Move Count\"\n                                name=\"starting_moves_list_count_5\"\n                                id=\"starting_moves_list_count_5\"\n                                class=\"form-control center-div move_count_button\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Amount of moves given from this item pool.\"\n                                default=\"0\"\n                                placeholder=\"0\"\n                                />\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_reset\">No Item Start</button>\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_start_vanilla\">Vanilla Start</button>\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"starting_moves_start_all\">Start With All</button>\n                <button type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>\n<script>\n    const sort_container = document.getElementById(\"item_rando-category-container\");\n    const sort_sections_items = sort_container.getElementsByClassName(\"shared\");\n    const sort_sections_checks = sort_container.getElementsByClassName(\"sharedchecks\");\n    let offset = sort_sections_items.length;\n    function makeSortable(el, groupName) {\n        let dragFromCloneBtn = false; // flag to indicate next drag starts from clone button\n\n        // detect mousedown/touchstart on clone buttons\n        el.addEventListener('mousedown', e => {\n            dragFromCloneBtn = !!e.target.closest('.clone-btn');\n        });\n        el.addEventListener('touchstart', e => {\n            dragFromCloneBtn = !!e.target.closest('.clone-btn');\n        });\n\n        new Sortable(el, {\n            group: {\n                name: groupName,\n                pull: (t, f, d, e) => {\n                    return dragFromCloneBtn ? 'clone' : true;\n                }, // always clone; emulate move if needed\n                put: [groupName]\n            },\n            handle: '.handle, .clone-btn', // only handle moves normally\n            animation: 150,\n            fallbackTolerance: 3,\n            sort: false,\n\n            onStart(evt) {\n                // set a dataset flag on the dragged item based on pre-recorded info\n                evt.item.dataset.cloneMode = dragFromCloneBtn ? 'true' : 'false';\n            },\n\n            onAdd(evt) {\n                const item = evt.item;\n                const to = evt.to;\n                const cloneMode = item.dataset.cloneMode === 'true';\n\n                if (!cloneMode) {\n                    const from = evt.from;\n                    if (from && from.contains(item)) {\n                    from.removeChild(item); // emulate move\n                    }\n                }\n\n                // remove duplicates in the destination based on value attribute\n                const value = item.getAttribute('value');\n                if (value) {\n                    const duplicates = Array.from(to.querySelectorAll('li')).filter(\n                        li => li !== item && li.getAttribute('value') === value\n                    );\n                    duplicates.forEach(dup => dup.remove());\n                }\n\n                delete item.dataset.cloneMode;\n\n                const changeEvent = new Event('change', { bubbles: true, cancelable: false });\n                evt.to.dispatchEvent(changeEvent);\n                updateCheckItemCounter(evt.to.parentElement.parentElement);\n            }\n        });\n    }\n    for (let i = 0; i < offset; i++) {\n        makeSortable(sort_sections_items[i], 'shared');\n        makeSortable(sort_sections_checks[i], 'sharedchecks');\n    }\n\n    function isNumeric(str) {\n        if (typeof str != \"string\") return false // we only process strings!  \n        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...\n                !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail\n    }\n\n    const item_count_mapping = {\n        \"medal\": \"total_medals\",\n        \"banana\": \"total_gbs\",\n        \"fairy\": \"total_fairies\",\n        \"pearl\": \"total_pearls\",\n        \"crown\": \"total_crowns\",\n        \"rainbowcoin\": \"total_rainbow_coins\",\n    }\n    function isShuffled(item_or_check) {\n        for (let x = 1; x < 5; x++) {\n            for (let y = 0; y < 2; y++) {\n                const idx = (y * 5) + x;\n                const ul = document.getElementById(`item_rando_list_${idx}`);\n                const ils = ul.getElementsByTagName(\"li\");\n                for (let i = 0; i < ils.length; i++) {\n                    if (ils[i].getAttribute(\"value\") == item_or_check) {\n                        return true;\n                    }\n                }\n            }\n        }\n        return false;\n    }\n\n    function getBananaReduction() {\n        const decoupled = document.getElementById(\"decouple_item_rando\").checked;\n        const reduction_data = {\n            \"racebanana\": 11,\n            \"gauntletbanana\": 16,\n        };\n        let total = 0;\n        if (decoupled) {\n            Object.keys(reduction_data).forEach(item_type => {\n                if (!isShuffled(item_type)) {\n                    total += reduction_data[item_type];\n                }\n            });\n        }\n        return total + 40; // Blueprint bananas are shuffled separately, so we always need to reduce them\n    }\n\n    function getItemChange(item, original_value) {\n        if (Object.keys(item_count_mapping).includes(item)) {\n            const ic_value = parseInt(document.getElementById(item_count_mapping[item]).value)\n            if (item == \"banana\") {\n                return Math.max(ic_value - getBananaReduction(), 0);\n            }\n            return ic_value;\n        }\n        return original_value;\n    }\n\n    function getCheckChange(item, original_value) {\n        if ((item === \"shop\") && document.getElementById(\"smaller_shops\").checked) {\n            return 60\n        } else if (([\"halfmedal\", \"medal_checks\"].includes(item)) && islesCBs()) {\n            return 40\n        }\n        return original_value;\n    }\n\n    function islesCBs() {\n        return document.querySelector(\"#cb_rando_list_selected option[value='DKIsles']\").selected && document.getElementById(\"cb_rando_enabled\").checked;\n    }\n\n    function getTiedCheckCount(value) {\n        const data_items_json = document.getElementById(\"item_rando-category-container\").getAttribute(\"data-items\");\n        const data_items = JSON.parse(data_items_json);\n        const tied_checks = data_items.filter(k => (k.is_check && k.tied == value) || (k.is_dummy && k.value == value));\n        let count = 0;\n        let latest_value = null;\n        tied_checks.forEach(k => {\n            count += getCheckChange(k.value, k.check_count);\n            latest_value = k.value;\n        });\n        return {\n            \"size\": count,\n            \"name\": latest_value,\n        }\n    }\n\n    function populateCheck(outputs, name, size, index) {\n        if (index > 0) {\n            if (!Object.keys(outputs).includes(name)) {\n                outputs[name] = {\n                    size: size,\n                    pools: [index - 1]\n                }\n            } else {\n                outputs[name].pools.push(index - 1)\n            }\n        }\n        return outputs;\n    }\n\n    function updateCheckItemCounter(ctr) {\n        const name = ctr.getAttribute(\"id\").split(\"-category-container\")[0];\n        const sort_sections_items = sort_container.getElementsByClassName(\"shared\");\n        const sort_sections_checks = sort_container.getElementsByClassName(\"sharedchecks\");\n        const decoupled = document.getElementById(\"decouple_item_rando\").checked;\n        let is_valid_item_spread = true;\n        \n        let item_shuffle_cache = {};\n        let item_shuffle_tied = {};\n        let offset = sort_sections_items.length;\n        let inputs = {};\n        let outputs = {};\n        let pools = {};\n        let poolstatus = {};\n        for (let index = 0; index < offset; index++) {\n            let local_check_count = 0;\n            let local_item_count = 0;\n            let parsed_options = 0;\n            for (let j = 0; j < 2; j++) {\n                let options;\n                if (j == 0) {\n                    options = sort_sections_items[index].getElementsByTagName(\"li\");\n                } else if (j == 1) {\n                    options = sort_sections_checks[index].getElementsByTagName(\"li\");\n                }\n                if (!decoupled && (j == 1)) {\n                    continue;\n                }\n                for (let option of options) {\n                    const check_count_raw = option.getAttribute(\"check_count\");\n                    const item_count_raw = option.getAttribute(\"items_count\");\n                    const tied_item_raw = option.getAttribute(\"tied_item\");\n                    const opt_value = option.getAttribute(\"value\");\n                    item_shuffle_cache[opt_value] = index;\n                    let parsed = false;\n                    if (tied_item_raw) {\n                        item_shuffle_tied[opt_value] = tied_item_raw;\n                    }\n                    if (!decoupled) {\n                        let data = getTiedCheckCount(opt_value);\n                        if (data.size > 0) {\n                            outputs = populateCheck(outputs, data.name, data.size, index);\n                        }\n                        parsed = true;\n                    } else if (j == 1) {\n                        if (isNumeric(check_count_raw)) {\n                            let size = getCheckChange(opt_value, parseInt(check_count_raw));\n                            if (size > 0) {\n                                outputs = populateCheck(outputs, opt_value, size, index);\n                            }\n                            parsed = true;\n                        }\n                    }\n                    if (isNumeric(item_count_raw)) {\n                        let size = getItemChange(opt_value, parseInt(item_count_raw));\n                        if (size > 0) {\n                            inputs = populateCheck(inputs, opt_value, size, index);\n                        }\n                        parsed = true;\n                    }\n                    if (parsed) {\n                        parsed_options++;\n                    }\n                }\n            }\n            if (index > 0) {\n                pools[index] = [];\n                poolstatus[index] = true;\n            }\n            /*\n            if (index > 0) {\n                let inner_text = \"\";\n                if (parsed_options > 0) {\n                    inner_text = `Checks: ${local_check_count} | Items: ${local_item_count}`;\n                }\n                if (local_item_count > local_check_count) {\n                    is_valid_item_spread = false;\n                }\n                const check_hint_el = document.getElementById(`${name}_check_hint_${index}`);\n                check_hint_el.title = \"\";\n                let text_color = \"DarkCyan\";\n                if (local_item_count > local_check_count) {\n                    // Too many items for the amount of checks\n                    text_color = \"red\";\n                } else if (local_item_count == local_check_count) {\n                    text_color = \"DarkOrange\";\n                    check_hint_el.title = \"This pool might have some trouble generating.\";\n                } else {\n                    text_color = \"green\";\n                }\n                check_hint_el.innerHTML = inner_text;\n                check_hint_el.style.color = text_color;\n            }\n            */\n        }\n        // Calculations\n        function checkDistribution(liquids, buckets, allow_splitting, debug=false) {\n            //if (debug) console.clear();\n            if (debug) console.log(\"Checking distribution\");\n            const pool_count = 4;\n            let pool_valid = [];\n            let pool_verified = [];\n            let pool_liquids = [];\n            let pool_buckets = [];\n            for (let x = 0; x < pool_count; x++) {\n                pool_valid.push(true);\n                pool_verified.push(false);\n                pool_liquids.push(0);\n                pool_buckets.push(0);\n            }\n            let lq_copy = liquids.slice();\n            let bk_copy = buckets.slice();\n            let iter_count = 100;\n            let ran_rules = [];\n            while (true) {\n                if (debug) {\n                    console.log(\"Init -> Rule 1\")\n                    console.log({\n                        remaining_liquids: JSON.parse(JSON.stringify(lq_copy)),\n                        remaining_buckets: JSON.parse(JSON.stringify(bk_copy)),\n                        verified: JSON.parse(JSON.stringify(pool_verified)),\n                        valid: JSON.parse(JSON.stringify(pool_valid)),\n                        liquid_sum: JSON.parse(JSON.stringify(pool_liquids)),\n                        bucket_sum: JSON.parse(JSON.stringify(pool_buckets)),\n                    })   \n                }\n                /*\n                    Rule 1:\n                    Any pools which only have checks or only have items should get filtered out\n                    if their non-filtered version has more than 0 items.\n                    This can only be ran once.\n                */\n                if (!ran_rules.includes(1)) {\n                    let has_liquids = [];\n                    let has_buckets = [];\n                    for (let x = 0; x < pool_count; x++) {\n                        has_liquids.push(false);\n                        has_buckets.push(false);\n                    }\n                    lq_copy.forEach(lq => {\n                        lq.pools.forEach(pl => {\n                            has_liquids[pl] = true;\n                        })\n                    });\n                    bk_copy.forEach(bk => {\n                        bk.pools.forEach(pl => {\n                            has_buckets[pl] = true;\n                        })\n                    });\n                    let pools_to_filter = [];\n                    for (let x = 0; x < pool_count; x++) {\n                        if (!has_buckets[x] || !has_liquids[x]) {\n                            pools_to_filter.push(x);\n                        }\n                    }\n                    pools_to_filter.forEach(pl => {\n                        lq_copy.forEach(lq => {\n                            if (lq.pools.includes(pl)) {\n                                let filtered_version = lq.pools.filter(i => !pools_to_filter.includes(i));\n                                if (filtered_version.length > 0) {\n                                    if (debug) console.log(`Filtering out ${lq.pools.length - filtered_version.length} values from pool ${pl}`);\n                                    lq.pools = filtered_version.slice();\n                                } else {\n                                    // This is the only instance of this item, thus making this pool invalid\n                                    pool_valid[pl] = false;\n                                    pool_verified[pl] = true;\n                                }\n                            }\n                        });\n                        bk_copy.forEach(bk => {\n                            if (bk.pools.includes(pl)) {\n                                let filtered_version = bk.pools.filter(i => !pools_to_filter.includes(i));\n                                if (filtered_version.length > 0) {\n                                    if (debug) console.log(`Filtering out ${bk.pools.length - filtered_version.length} values from pool ${pl}`);\n                                    bk.pools = filtered_version.slice();\n                                }\n                            }\n                        });\n                    })\n                    ran_rules.push(1);\n                }\n                /*\n                    Rule 2:\n                    Any completely empty pools should add all of their items/checks in them\n                    Any pools with greater amounts of items than checks gets flagged as invalid.\n                */\n                if (debug) {\n                    console.log(\"Rule 1 -> Rule 2\")\n                    console.log({\n                        remaining_liquids: JSON.parse(JSON.stringify(lq_copy)),\n                        remaining_buckets: JSON.parse(JSON.stringify(bk_copy)),\n                        verified: JSON.parse(JSON.stringify(pool_verified)),\n                        valid: JSON.parse(JSON.stringify(pool_valid)),\n                        liquid_sum: JSON.parse(JSON.stringify(pool_liquids)),\n                        bucket_sum: JSON.parse(JSON.stringify(pool_buckets)),\n                    })   \n                }\n                let found_lq = [];\n                let found_bk = [];\n                for (let x = 0; x < pool_count; x++) {\n                    found_lq.push(false);\n                    found_bk.push(false);\n                }\n                lq_copy.forEach(lq => {\n                    lq.pools.forEach(pl => {\n                        found_lq[pl] = true;\n                    })\n                })\n                bk_copy.forEach(bk => {\n                    bk.pools.forEach(pl => {\n                        found_bk[pl] = true;\n                    })\n                })\n                for (let x = 0; x < pool_count; x++) {\n                    if (!found_lq[x] && !found_bk[x]) {\n                        if (pool_buckets[x] < pool_liquids[x]) {\n                            if (debug) console.log(`Too many items for pool ${x + 1}: ${pool_liquids[x]} vs ${pool_buckets[x]}`);\n                            pool_valid[x] = false;\n                            pool_verified[x] = true;\n                        }\n                    }\n                }\n                /*\n                    Rule 3:\n                    Any items/checks which are only part of 1 pool should get filtered out and applied to a guaranteed liq/buck total\n                */\n                if (debug) {\n                    console.log(\"Rule 2 -> Rule 3\")\n                    console.log({\n                        remaining_liquids: JSON.parse(JSON.stringify(lq_copy)),\n                        remaining_buckets: JSON.parse(JSON.stringify(bk_copy)),\n                        verified: JSON.parse(JSON.stringify(pool_verified)),\n                        valid: JSON.parse(JSON.stringify(pool_valid)),\n                        liquid_sum: JSON.parse(JSON.stringify(pool_liquids)),\n                        bucket_sum: JSON.parse(JSON.stringify(pool_buckets)),\n                    })   \n                }\n                let temp_lq = [];\n                lq_copy.forEach(lq => {\n                    if (lq.pools.length == 1) {\n                        if (debug) console.log(`Eliminate Liquid ${JSON.stringify(lq)}`);\n                        pool_liquids[lq.pools[0]] += lq.size;\n                    } else {\n                        temp_lq.push(lq);\n                    } \n                });\n                lq_copy = temp_lq.slice();\n                let temp_bk = [];\n                bk_copy.forEach(bk => {\n                    if (bk.pools.length == 1) {\n                        if (debug) console.log(`Eliminate Bucket ${JSON.stringify(bk)}`);\n                        pool_buckets[bk.pools[0]] += bk.size;\n                    } else {\n                        temp_bk.push(bk);\n                    } \n                });\n                if (debug) {\n                    console.log(\"Rule 3 -> Rule 4\")\n                    console.log({\n                        remaining_liquids: JSON.parse(JSON.stringify(lq_copy)),\n                        remaining_buckets: JSON.parse(JSON.stringify(bk_copy)),\n                        verified: JSON.parse(JSON.stringify(pool_verified)),\n                        valid: JSON.parse(JSON.stringify(pool_valid)),\n                        liquid_sum: JSON.parse(JSON.stringify(pool_liquids)),\n                        bucket_sum: JSON.parse(JSON.stringify(pool_buckets)),\n                    })   \n                }\n                if (allow_splitting) {\n                    let bk_copy_largest_to_smallest = temp_bk.slice();\n                    bk_copy_largest_to_smallest.sort((a, b) => b.size - a.size);\n                    console.log(bk_copy_largest_to_smallest);\n                    /*\n                        Rule 4:\n                        For all remaining buckets, check the pools which need the checks the most\n                    */\n                    let bucket_deficit = pool_liquids.map((v, i) => v - pool_buckets[i]);\n                    temp_bk = [];\n                    bk_copy_largest_to_smallest.forEach(bk => {\n                        let remove = false;\n                        let bucket_needed = null;\n                        let bucket_deficit_needed = null;\n                        bk.pools.forEach(pl => {\n                            if (bucket_deficit[pl] >= 0) {\n                                if (bucket_needed === null || bucket_deficit[pl] > bucket_deficit_needed) {\n                                    bucket_needed = pl;\n                                    bucket_deficit_needed = bucket_deficit[pl];\n                                }\n                            }\n                        })\n                        if (bucket_needed !== null) {\n                            let bucket_capacity_supplied = Math.min(bucket_deficit_needed, bk.size);\n                            bk.size -= bucket_capacity_supplied;\n                            pool_buckets[bucket_needed] += bucket_capacity_supplied;\n                            bucket_deficit[bucket_needed] -= bucket_capacity_supplied;\n                            bk.pools = bk.pools.filter(i => i !== bucket_needed);\n                            if (bk.size < 1) {\n                                remove = true;\n                            }\n                        }\n                        if (!remove) {\n                            temp_bk.push(bk);\n                        }\n                    })\n                    bk_copy = temp_bk.slice();\n                } else {\n                    /*\n                        Rule 4b:\n                        If splitting is not allowed, no buckets get added\n                    */\n                    bk_copy.forEach(bk => {\n                        bk.size = 0;\n                        bk.pools = [];\n                    })\n                    bk_copy = [];\n                }\n                if (debug) {\n                    console.log(\"Rule 4 -> Rule 5\")\n                    console.log({\n                        remaining_liquids: JSON.parse(JSON.stringify(lq_copy)),\n                        remaining_buckets: JSON.parse(JSON.stringify(bk_copy)),\n                        verified: JSON.parse(JSON.stringify(pool_verified)),\n                        valid: JSON.parse(JSON.stringify(pool_valid)),\n                        liquid_sum: JSON.parse(JSON.stringify(pool_liquids)),\n                        bucket_sum: JSON.parse(JSON.stringify(pool_buckets)),\n                    })   \n                }\n                if (allow_splitting) {\n                    /*\n                        Rule 5:\n                        For all remaining liquids, check the pools which have the smallest bucket gap\n                    */\n                    let bucket_surplus = pool_buckets.map((v, i) => v - pool_liquids[i]);\n                    temp_lq = [];\n                    lq_copy.forEach(lq => {\n                        let remove = false;\n                        let bucket_needed = null;\n                        let bucket_surplus_needed = null;\n                        lq.pools.forEach(pl => {\n                            if (bucket_surplus[pl] >= 0) {\n                                if (bucket_needed === null || bucket_surplus[pl] < bucket_surplus_needed) {\n                                    bucket_needed = pl;\n                                    bucket_surplus_needed = bucket_surplus[pl];\n                                }\n                            }\n                        })\n                        if (bucket_needed !== null) {\n                            let liquid_supplied = Math.min(bucket_surplus_needed, lq.size);\n                            lq.size -= liquid_supplied;\n                            pool_liquids[bucket_needed] += liquid_supplied;\n                            lq.pools = lq.pools.filter(i => i !== bucket_needed);\n                            if (lq.size < 1) {\n                                remove = true;\n                            }\n                        }\n                        if (!remove) {\n                            temp_lq.push(lq);\n                        }\n                    })\n                    lq_copy = temp_lq.slice();\n                } else {\n                    /*\n                        Rule 5b:\n                        If splitting is not allowed, add liquids to all buckets\n                    */\n                    lq_copy.forEach(lq => {\n                        lq.pools.forEach(pl => {\n                            pool_liquids[pl] += lq.size;\n                        });\n                        lq.size = 0;\n                        lq.pools = [];\n                    })\n                    lq_copy = [];\n                }\n                // Termination checks\n                let terminate = lq_copy.length == 0 && bk_copy.length == 0;\n                if (terminate) {\n                    pool_valid = pool_liquids.map((v, i) => (pool_valid[i] & v <= pool_buckets[i]) !== 0);\n                    pool_verified = [true, true, true, true];\n                }\n                let terminate_verified = true;\n                for (let x = 0; x < pool_count; x++) {\n                    if (pool_valid[x]) {\n                        terminate = false;\n                    }\n                    if (!pool_verified[x]) {\n                        terminate_verified = false;\n                    }\n                }\n                if (terminate || terminate_verified) {\n                    break;\n                }\n                iter_count--;\n                if (iter_count < 1) {\n                    break;\n                }\n            }\n            if (debug) {\n                let data = {\n                    remaining_liquids: lq_copy,\n                    remaining_buckets: bk_copy,\n                    verified: pool_verified,\n                    valid: pool_valid,\n                    liquid_sum: pool_liquids,\n                    bucket_sum: pool_buckets,\n                }\n                console.log(data)\n            }\n            return {\n                valid: pool_valid,\n                item_counts: pool_liquids,\n                check_counts: pool_buckets,\n                verified: pool_verified,\n            }\n        }\n        \n        let first_inputs = JSON.parse(JSON.stringify(inputs));\n        let first_outputs = JSON.parse(JSON.stringify(outputs));\n        const result = checkDistribution(Object.values(first_inputs), Object.values(first_outputs), true);\n        let second_inputs = JSON.parse(JSON.stringify(inputs));\n        let second_outputs = JSON.parse(JSON.stringify(outputs));\n        const backupResult = checkDistribution(Object.values(second_inputs), Object.values(second_outputs), false);\n        is_valid_item_spread = true;\n        for (let x = 0; x < 4; x++) {\n            const node = document.getElementById(`item_rando_check_hint_${x + 1}`);\n            node.innerText = `Items: Up to ${backupResult.item_counts[x]}\\nChecks: At least ${backupResult.check_counts[x]}`;\n            node.title = `Optimal Placement: Items: ${result.item_counts[x]} | Checks: ${result.check_counts[x]}.`\n            is_valid_item_spread &= result.valid[x];\n            if (result.valid[x]) {\n                if (!backupResult.valid[x]) {\n                    node.style.color = \"orange\";\n                    node.title = `Pool may have some trouble filling\\n${node.title}`;\n                } else {\n                    node.style.color = \"green\";\n                    node.title = `Pool is valid\\n${node.title}`;\n                }\n            } else {\n                node.style.color = \"red\";\n                node.title = \"Pool is invalid due to too many items/too few checks\";\n            }\n        }\n\n        let is_valid_item_shuffle = true;\n        Object.keys(item_shuffle_tied).forEach(key => {\n            const val = item_shuffle_tied[key];\n            let valid_check = true;\n            if ((val == \"banana\") && (key != \"banana_checks\")) {\n                valid_check = false;\n            }\n            if (valid_check) {\n                const key_slot = item_shuffle_cache[key];\n                const val_slot = item_shuffle_cache[val];\n                if (key_slot != val_slot) {\n                    if ((key_slot == 0) || (val_slot == 0)) {\n                        // Key or val is in slot 0, but not both\n                        is_valid_item_shuffle = false;\n                    }\n                }\n            }\n        });\n        document.getElementById(\"rule-item-count\").style.color = is_valid_item_spread ? \"white\" : \"red\";\n        document.getElementById(\"rule-item-shuffle\").style.color = is_valid_item_shuffle ? \"white\" : \"red\";\n    }\n\n\n    function setAllToColumn(name, index) {\n        const container = document.getElementById(`${name}-category-container`);\n        const sort_sections_items = sort_container.getElementsByClassName(\"shared\");\n        const sort_sections_checks = sort_container.getElementsByClassName(\"sharedchecks\");\n        const offset = sort_sections_items.length;\n        let total_html_items = \"\";\n        let total_html_checks = \"\";\n        let total_items_values = [];\n        let total_checks_values = [];\n        for (let i = 0; i < offset; i++) {\n            const items = sort_sections_items[i].getElementsByTagName(\"li\");\n            const checks = sort_sections_checks[i].getElementsByTagName(\"li\");\n            for (let k = 0; k < items.length; k++) {\n                const item_value = items[k].getAttribute(\"value\");\n                if (!total_items_values.includes(item_value)) {\n                    total_items_values.push(item_value);\n                    total_html_items += items[k].outerHTML;\n                }\n            }\n            for (let k = 0; k < checks.length; k++) {\n                const check_value = checks[k].getAttribute(\"value\");\n                if (!total_checks_values.includes(check_value)) {\n                    total_checks_values.push(check_value);\n                    total_html_checks += checks[k].outerHTML;\n                }\n            }\n        }\n        for (let i = 0; i < offset; i++) {\n            if (i == index) {\n                sort_sections_items[index].innerHTML = total_html_items;\n                sort_sections_checks[index].innerHTML = total_html_checks;\n            } else {\n                sort_sections_items[i].innerHTML = \"\";\n                sort_sections_checks[i].innerHTML = \"\";\n            }\n            const event = new Event(\"change\", { bubbles: true, cancelable: false });\n            sort_sections_items[i].dispatchEvent(event);\n            sort_sections_checks[i].dispatchEvent(event);\n        }\n        updateCheckItemCounter(container);\n    }\n\n    document.getElementById(\"decouple_item_rando\").addEventListener(\"click\", () => {\n        const container = document.getElementById(\"item_rando-category-container\");\n        updateCheckItemCounter(container);\n    });\n\n    document.getElementById(\"item_rando_reset\").addEventListener(\"click\", (e) => {setAllToColumn(\"item_rando\", 0)});\n    document.getElementById(\"item_rando_shuffle_all\").addEventListener(\"click\", (e) => {setAllToColumn(\"item_rando\", 1)});\n</script>\n<script>\n    $(function() {\n        $('[data-toggle=\"tooltip\"]').tooltip({\n            trigger: 'hover'\n        });\n    });\n</script>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})})})});
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
output += "<div class=\"position-relative\">\n    <div class=\"position-absolute bottom-0 end-0\">\n        <button class=\"nav-link bg-transparent nav-item\"\n                id=\"light-switch\"\n                type=\"button\"\n                aria-selected=\"false\">\n            <p class=\"select-title d-flex text-end\" style=\"min-width:0px\">\n                <span id=\"light-switch-icon-light\" hidden>\n                    <i class=\"fa-solid fa-lightbulb fa-xl\"></i>\n                </span>\n                <span id=\"light-switch-icon-dark\">\n                    <i class=\"fa-solid fa-moon fa-xl\"></i>\n                </span>\n            </p>\n        </button>\n    </div>\n</div>\n<script>\n    document.getElementById('light-switch').addEventListener('click',()=>{\n        const dark_hook = document.getElementById(\"light-switch-icon-dark\");\n        const light_hook = document.getElementById(\"light-switch-icon-light\");\n        if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {\n            document.documentElement.setAttribute('data-bs-theme','light')\n            light_hook.removeAttribute(\"hidden\")\n            dark_hook.setAttribute(\"hidden\", \"\")\n        }\n        else {\n            document.documentElement.setAttribute('data-bs-theme','dark')\n            dark_hook.removeAttribute(\"hidden\")\n            light_hook.setAttribute(\"hidden\", \"\")\n        }\n    });\n</script>";
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
env.getTemplate("dropdown_multiselector.html", false, "macros.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "dropdown_multiselector")) {
var t_4 = t_1.dropdown_multiselector;
} else {
cb(new Error("cannot import 'dropdown_multiselector'")); return;
}
context.setVariable("dropdown_multiselector", t_4);
output += "\n\n";
var macro_t_5 = runtime.makeMacro(
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
frame.set("includeDisclaimer", Object.prototype.hasOwnProperty.call(kwargs, "includeDisclaimer") ? kwargs["includeDisclaimer"] : 0);frame.set("overrideDisclaimer", Object.prototype.hasOwnProperty.call(kwargs, "overrideDisclaimer") ? kwargs["overrideDisclaimer"] : "");var t_6 = "";t_6 += "\n    <!-- Icon triggers modal -->\n    <input class=\"customize\"\n           type=\"button\"\n           href=\"#\"\n           id=\"";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_modal\"\n           data-bs-toggle=\"modal\"\n           data-bs-target=\"#";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_Modal\"\n           data-toggle=\"tooltip\"\n           title=\"";
t_6 += runtime.suppressValue(l_tooltip, env.opts.autoescape);
t_6 += "\"/>\n</div>\n<!-- Modal -->\n<div class=\"modal fade\"\n     id=\"";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_Modal\"\n     tabindex=\"-1\"\n     aria-labelledby=\"";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_ModalLabel\"\n     aria-hidden=\"true\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h3 class=\"modal-title title\" id=\"";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_ModalLabel\">";
t_6 += runtime.suppressValue(l_title, env.opts.autoescape);
t_6 += "</h3>\n                <button type=\"button\"\n                        class=\"btn-close\"\n                        data-bs-dismiss=\"modal\"\n                        aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"item-multiselect\" style=\"margin-left: 105px;\">\n                    <div class=\"color-selector\">\n                        <div class=\"input-group\">\n                            <div class=\"input-group-prepend\">\n                                <div class=\"input-group-text search\">\n                                    <input type=\"text\"\n                                           class=\"form-control\"\n                                           id=\"";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_search_box\"\n                                           name=\"search\"\n                                           placeholder=\"Search\"/>\n                                </div>\n                            </div>\n                            <select name=\"";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_selected\"\n                                    id=\"";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_selected\"\n                                    class=\"form-select multi-select selected\"\n                                    aria-label=\"List_Selector\"\n                                    multiple\n                                    size=\"";
t_6 += runtime.suppressValue(l_size, env.opts.autoescape);
t_6 += "\">\n                                ";
frame = frame.push();
var t_9 = l_list;
if(t_9) {t_9 = runtime.fromIterator(t_9);
var t_8 = t_9.length;
for(var t_7=0; t_7 < t_9.length; t_7++) {
var t_10 = t_9[t_7];
frame.set("item", t_10);
frame.set("loop.index", t_7 + 1);
frame.set("loop.index0", t_7);
frame.set("loop.revindex", t_8 - t_7);
frame.set("loop.revindex0", t_8 - t_7 - 1);
frame.set("loop.first", t_7 === 0);
frame.set("loop.last", t_7 === t_8 - 1);
frame.set("loop.length", t_8);
t_6 += "\n                                    <option value=\"";
t_6 += runtime.suppressValue(runtime.memberLookup((t_10),"value"), env.opts.autoescape);
t_6 += "\" title=\"";
t_6 += runtime.suppressValue(runtime.memberLookup((t_10),"tooltip"), env.opts.autoescape);
t_6 += "\">\n                                        ";
t_6 += runtime.suppressValue(runtime.memberLookup((t_10),"name"), env.opts.autoescape);
t_6 += "\n                                    </option>\n                                ";
;
}
}
frame = frame.pop();
t_6 += "\n                            </select>\n                        </div>\n                    </div>\n                </div>\n                ";
if(runtime.contextOrFrameLookup(context, frame, "overrideDisclaimer") != "") {
t_6 += "\n                    <div class=\"fst-italic\">\n                        <div>";
t_6 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "overrideDisclaimer"), env.opts.autoescape);
t_6 += "</div>\n                    </div>\n                ";
;
}
t_6 += "\n                ";
if(runtime.contextOrFrameLookup(context, frame, "includeDisclaimer")) {
t_6 += "\n                    <div class=\"fst-italic\">\n                        <div>If nothing is selected, all options are treated as selected.</div>\n                        <div>Disable the setting slider to disable all options.</div>\n                    </div>\n                ";
;
}
t_6 += "\n                ";
if(l_name == "minigames_list") {
t_6 += "\n                    <div class=\"form-check form-switch\" style=\"padding-left: 1.5em;\">\n                        <label data-toggle=\"tooltip\"\n                            style=\"font-size:14px;\"\n                            title=\"The hardest variants of minigames are removed.\">\n                            <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"disable_hard_minigames\"\n                                id=\"disable_hard_minigames\"\n                                value=\"True\"/>\n                            No Hard Minigames\n                        </label>\n                    </div>\n                ";
;
}
t_6 += "\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_select_all\">Select All</button>\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_reset\">Reset</button>\n                <button type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>\n<script>\n    $('#";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_selected option').mousedown(function(e) {\n        var el = e.target\n    \n        $(this).prop('selected', !$(this).prop('selected'));\n        $(this).trigger('change');\n    \n        // fixes erratic scroll behavior in Chrome\n        var scrollTop = el.parentNode.scrollTop;\n        setTimeout(() => el.parentNode.scrollTo(0, scrollTop), 0);\n    \n        return false;\n    });\n    \n    $('#";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_select_all').click(function() {\n        $('#";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_selected option').prop('selected', true);\n        $('#";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_selected').trigger('change');\n    });\n    \n    $('#";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_reset').click(function() {\n        $('#";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_selected option:selected').prop('selected', false);\n        $('#";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_selected').trigger('change');\n    });\n    \n    $('#";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_search_box').keyup(function() {\n        var keyword = document.getElementById(\"";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_search_box\").value;\n        var select = document.getElementById(\"";
t_6 += runtime.suppressValue(l_name, env.opts.autoescape);
t_6 += "_selected\");\n        for (var i = 0; i < select.length; i++) {\n            var txt = select.options[i].text;\n            if (txt.substring(0, keyword.length).toLowerCase() !== keyword.toLowerCase() && keyword.trim() !== \"\") {\n                select.options[i].style.display = 'none';\n            } else {\n                select.options[i].style.display = 'list-item';\n            }\n        }\n    });\n</script>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_6);
});
context.addExport("list_selector");
context.setVariable("list_selector", macro_t_5);
output += "\n";
var macro_t_11 = runtime.makeMacro(
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
var t_12 = "";t_12 += "\n    <!-- Icon triggers modal -->\n    <input class=\"customize\"\n           type=\"button\"\n           href=\"#\"\n           id=\"";
t_12 += runtime.suppressValue(l_name, env.opts.autoescape);
t_12 += "_modal\"\n           data-bs-toggle=\"modal\"\n           data-bs-target=\"#";
t_12 += runtime.suppressValue(l_name, env.opts.autoescape);
t_12 += "_Modal\"\n           data-toggle=\"tooltip\"\n           title=\"";
t_12 += runtime.suppressValue(l_tooltip, env.opts.autoescape);
t_12 += "\"/>\n</div>\n<!-- Modal -->\n<div class=\"modal fade\"\n     id=\"";
t_12 += runtime.suppressValue(l_name, env.opts.autoescape);
t_12 += "_Modal\"\n     tabindex=\"-1\"\n     aria-labelledby=\"";
t_12 += runtime.suppressValue(l_name, env.opts.autoescape);
t_12 += "_ModalLabel\"\n     aria-hidden=\"true\">\n    <div class=\"modal-dialog\" style=\"max-width:700px\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h3 class=\"modal-title title\" id=\"";
t_12 += runtime.suppressValue(l_name, env.opts.autoescape);
t_12 += "_ModalLabel\">";
t_12 += runtime.suppressValue(l_title, env.opts.autoescape);
t_12 += "</h3>\n                <button type=\"button\"\n                        class=\"btn-close\"\n                        data-bs-dismiss=\"modal\"\n                        aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n                <div>\n                    <div class=\"flex-container\">\n                        ";
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
t_12 += "\n                            <div class=\"item-select\" style=\"margin:0;flex:0;min-width:150px;\">\n                                <p class=\"select-title\">";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"name"), env.opts.autoescape);
t_12 += "</p>\n                                ";
if(runtime.memberLookup((t_16),"name") == "Starting Time") {
t_12 += "\n                                    <input \n                                    min=\"0\"\n                                    max=\"65535\"\n                                    name=\"";
t_12 += runtime.suppressValue(l_name, env.opts.autoescape);
t_12 += "_";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"value"), env.opts.autoescape);
t_12 += "\"\n                                    id=\"";
t_12 += runtime.suppressValue(l_name, env.opts.autoescape);
t_12 += "_";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"value"), env.opts.autoescape);
t_12 += "\"\n                                    style=\"width:15%\"\n                                    class=\"form-control center-div\"\n                                    type=\"number\"\n                                    value=\"";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"default"), env.opts.autoescape);
t_12 += "\"\n                                    default_val=\"";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"default"), env.opts.autoescape);
t_12 += "\">\n                                ";
;
}
else {
t_12 += "\n                                    <input \n                                    min=\"-32768\"\n                                    max=\"32767\"\n                                    name=\"";
t_12 += runtime.suppressValue(l_name, env.opts.autoescape);
t_12 += "_";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"value"), env.opts.autoescape);
t_12 += "\"\n                                    id=\"";
t_12 += runtime.suppressValue(l_name, env.opts.autoescape);
t_12 += "_";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"value"), env.opts.autoescape);
t_12 += "\"\n                                    style=\"width:15%\"\n                                    class=\"form-control center-div\"\n                                    type=\"number\"\n                                    value=\"";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"default"), env.opts.autoescape);
t_12 += "\"\n                                    default_val=\"";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"default"), env.opts.autoescape);
t_12 += "\">\n                                ";
;
}
t_12 += "\n                            </div>\n                        ";
;
}
}
frame = frame.pop();
t_12 += "\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"";
t_12 += runtime.suppressValue(l_name, env.opts.autoescape);
t_12 += "_reset\">Reset</button>\n                <button type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>\n<script>\n    $('#";
t_12 += runtime.suppressValue(l_name, env.opts.autoescape);
t_12 += "_reset').click(function() {\n        ";
frame = frame.push();
var t_19 = l_list;
if(t_19) {t_19 = runtime.fromIterator(t_19);
var t_18 = t_19.length;
for(var t_17=0; t_17 < t_19.length; t_17++) {
var t_20 = t_19[t_17];
frame.set("item", t_20);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
t_12 += "\n            $('#";
t_12 += runtime.suppressValue(l_name, env.opts.autoescape);
t_12 += "_";
t_12 += runtime.suppressValue(runtime.memberLookup((t_20),"value"), env.opts.autoescape);
t_12 += "').prop('value', $('#";
t_12 += runtime.suppressValue(l_name, env.opts.autoescape);
t_12 += "_";
t_12 += runtime.suppressValue(runtime.memberLookup((t_20),"value"), env.opts.autoescape);
t_12 += "').attr('default_val'))\n            $('#";
t_12 += runtime.suppressValue(l_name, env.opts.autoescape);
t_12 += "_";
t_12 += runtime.suppressValue(runtime.memberLookup((t_20),"value"), env.opts.autoescape);
t_12 += "').trigger('change')\n        ";
;
}
}
frame = frame.pop();
t_12 += "\n    });\n</script>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_12);
});
context.addExport("properties_selector");
context.setVariable("properties_selector", macro_t_11);
output += "\n";
var macro_t_21 = runtime.makeMacro(
["id", "name"], 
["tooltip", "default_checked", "altered_name", "hidden"], 
function (l_id, l_name, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("id", l_id);
frame.set("name", l_name);
frame.set("tooltip", Object.prototype.hasOwnProperty.call(kwargs, "tooltip") ? kwargs["tooltip"] : "");frame.set("default_checked", Object.prototype.hasOwnProperty.call(kwargs, "default_checked") ? kwargs["default_checked"] : runtime.contextOrFrameLookup(context, frame, "False"));frame.set("altered_name", Object.prototype.hasOwnProperty.call(kwargs, "altered_name") ? kwargs["altered_name"] : "");frame.set("hidden", Object.prototype.hasOwnProperty.call(kwargs, "hidden") ? kwargs["hidden"] : "");var t_22 = "";t_22 += "\n<div class=\"form-check form-switch item-switch\" data-toggle=\"tooltip\"\n            title=\"";
t_22 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tooltip"), env.opts.autoescape);
t_22 += "\" ";
t_22 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "hidden"), env.opts.autoescape);
t_22 += ">\n    ";
if(runtime.contextOrFrameLookup(context, frame, "default_checked")) {
t_22 += "\n        <input\n            class=\"form-check-input\"\n            type=\"checkbox\"\n            role=\"switch\"\n            name=\"";
t_22 += runtime.suppressValue(l_id, env.opts.autoescape);
t_22 += "\"\n            id=\"";
t_22 += runtime.suppressValue(l_id, env.opts.autoescape);
t_22 += "\"\n            display_name=\"";
t_22 += runtime.suppressValue(l_name, env.opts.autoescape);
t_22 += "\"\n            value=\"True\" checked />\n    ";
;
}
else {
t_22 += "\n        <input\n            class=\"form-check-input\"\n            type=\"checkbox\"\n            role=\"switch\"\n            name=\"";
t_22 += runtime.suppressValue(l_id, env.opts.autoescape);
t_22 += "\"\n            id=\"";
t_22 += runtime.suppressValue(l_id, env.opts.autoescape);
t_22 += "\"\n            display_name=\"";
t_22 += runtime.suppressValue(l_name, env.opts.autoescape);
t_22 += "\"\n            value=\"True\" />\n    ";
;
}
t_22 += "\n    <label class=\"form-check-label\" for=\"";
t_22 += runtime.suppressValue(l_id, env.opts.autoescape);
t_22 += "\">\n        ";
if(runtime.contextOrFrameLookup(context, frame, "altered_name") == "") {
t_22 += "\n            ";
t_22 += runtime.suppressValue(l_name, env.opts.autoescape);
t_22 += "\n        ";
;
}
else {
t_22 += "\n            ";
t_22 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "altered_name"), env.opts.autoescape);
t_22 += "\n        ";
;
}
t_22 += "\n    </label>\n</div>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_22);
});
context.addExport("toggle_input");
context.setVariable("toggle_input", macro_t_21);
output += "\n\n";
var macro_t_23 = runtime.makeMacro(
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
var t_24 = "";t_24 += "\n    <input type=\"range\"\n        name=\"";
t_24 += runtime.suppressValue(l_id, env.opts.autoescape);
t_24 += "\"\n        id=\"";
t_24 += runtime.suppressValue(l_id, env.opts.autoescape);
t_24 += "\"\n        display_name=\"";
t_24 += runtime.suppressValue(l_name, env.opts.autoescape);
t_24 += "\"\n        min=\"";
t_24 += runtime.suppressValue(l_min_value, env.opts.autoescape);
t_24 += "\"\n        max=\"";
t_24 += runtime.suppressValue(l_max_value, env.opts.autoescape);
t_24 += "\"\n        style=\"width: 80%\"\n        class=\"pretty-slider\"\n        list=\"";
t_24 += runtime.suppressValue(l_id, env.opts.autoescape);
t_24 += "_tickmarks\">\n    <datalist id=\"";
t_24 += runtime.suppressValue(l_id, env.opts.autoescape);
t_24 += "_tickmarks\" style=\"width: 80%; margin-top: -10px\" class=\"d-flex justify-content-between mx-auto px-1\">\n        ";
frame = frame.push();
var t_27 = (lineno = 247, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [l_min_value,l_max_value + 1]));
if(t_27) {t_27 = runtime.fromIterator(t_27);
var t_26 = t_27.length;
for(var t_25=0; t_25 < t_27.length; t_25++) {
var t_28 = t_27[t_25];
frame.set("val", t_28);
frame.set("loop.index", t_25 + 1);
frame.set("loop.index0", t_25);
frame.set("loop.revindex", t_26 - t_25);
frame.set("loop.revindex0", t_26 - t_25 - 1);
frame.set("loop.first", t_25 === 0);
frame.set("loop.last", t_25 === t_26 - 1);
frame.set("loop.length", t_26);
t_24 += "\n            <option value=\"";
t_24 += runtime.suppressValue(t_28, env.opts.autoescape);
t_24 += "\" label=\"";
t_24 += runtime.suppressValue(t_28, env.opts.autoescape);
t_24 += "\"></option>\n        ";
;
}
}
frame = frame.pop();
t_24 += "\n    </datalist>\n    <script>\n        [\"change\", \"input\", \"load\"].forEach(evt => {\n            document.getElementById(\"";
t_24 += runtime.suppressValue(l_id, env.opts.autoescape);
t_24 += "\").addEventListener(evt, (e) => {\n                const targ_value = e.target.value;\n                const targ_min = e.target.getAttribute(\"min\");\n                const targ_max = e.target.getAttribute(\"max\");\n                const targ_delta = targ_max - targ_min;\n                const value_delta = targ_value - targ_min;\n                e.target.style.setProperty(\"--p\", `${parseInt(100 * (value_delta / targ_delta))}%`)\n            });\n        });\n    </script>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_24);
});
context.addExport("slider_input");
context.setVariable("slider_input", macro_t_23);
output += "\n";
var macro_t_29 = runtime.makeMacro(
["name", "setting", "subtype", "default"], 
[], 
function (l_name, l_setting, l_subtype, l_default, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("name", l_name);
frame.set("setting", l_setting);
frame.set("subtype", l_subtype);
frame.set("default", l_default);
var t_30 = "";t_30 += "\n    <div class=\"col\">\n        <div class=\"item-select\">\n            <p class=\"select-title\">";
t_30 += runtime.suppressValue(l_name, env.opts.autoescape);
t_30 += "</p>\n            <select name=\"";
t_30 += runtime.suppressValue(l_setting, env.opts.autoescape);
t_30 += "\"\n                    id=\"";
t_30 += runtime.suppressValue(l_setting, env.opts.autoescape);
t_30 += "\"\n                    class=\"form-select\"\n                    aria-label=\"Randomization type\"\n                    display_name=\"name\"\n                    data-toggle=\"tooltip\"\n                    title=\"Switch assigned to ";
t_30 += runtime.suppressValue(l_name, env.opts.autoescape);
t_30 += ".\">\n                ";
if(l_subtype != "gone_to_helm") {
t_30 += "\n                    ";
if(l_subtype != "free_tiny") {
t_30 += "\n                        <option id=\"donkey\" ";
if(l_default == "donkey") {
t_30 += "selected";
;
}
t_30 += " value=\"donkey\">\n                            ";
if(l_subtype == "guns") {
t_30 += "Coconut\n                            ";
;
}
else {
if(l_subtype == "instruments") {
t_30 += "Bongos\n                            ";
;
}
else {
if(l_subtype == "kong") {
t_30 += "Donkey\n                            ";
;
}
else {
if(l_subtype == "mport_to_helm") {
t_30 += "Blast\n                            ";
;
}
else {
if(l_subtype == "free_lanky") {
t_30 += "Bongos/Coconut\n                            ";
;
}
else {
if(l_subtype == "free_tiny") {
t_30 += "You should not see this\n                            ";
;
}
;
}
;
}
;
}
;
}
;
}
t_30 += "\n                        </option>\n                    ";
;
}
t_30 += "\n                    ";
if(l_subtype != "mport_to_helm") {
t_30 += "\n                        <option id=\"diddy\" ";
if(l_default == "diddy") {
t_30 += "selected";
;
}
t_30 += " value=\"diddy\">\n                            ";
if(l_subtype == "guns") {
t_30 += "Peanut\n                            ";
;
}
else {
if(l_subtype == "instruments") {
t_30 += "Guitar\n                            ";
;
}
else {
if(l_subtype == "kong") {
t_30 += "Diddy\n                            ";
;
}
else {
if(l_subtype == "mport_to_helm") {
t_30 += "You should not see this\n                            ";
;
}
else {
if(l_subtype == "free_lanky") {
t_30 += "Guitar/Peanut\n                            ";
;
}
else {
if(l_subtype == "free_tiny") {
t_30 += "Chimpy Charge\n                            ";
;
}
;
}
;
}
;
}
;
}
;
}
t_30 += "\n                        </option>\n                    ";
;
}
t_30 += "\n                    ";
if(l_subtype != "free_tiny") {
t_30 += "\n                        <option id=\"lanky\" ";
if(l_default == "lanky") {
t_30 += "selected";
;
}
t_30 += " value=\"lanky\">\n                            ";
if(l_subtype == "guns") {
t_30 += "Grape\n                            ";
;
}
else {
if(l_subtype == "instruments") {
t_30 += "Trombone\n                            ";
;
}
else {
if(l_subtype == "kong") {
t_30 += "Lanky\n                            ";
;
}
else {
if(l_subtype == "mport_to_helm") {
t_30 += "Balloon\n                            ";
;
}
else {
if(l_subtype == "free_lanky") {
t_30 += "Trombone/Grape\n                            ";
;
}
else {
if(l_subtype == "free_tiny") {
t_30 += "You should not see this\n                            ";
;
}
;
}
;
}
;
}
;
}
;
}
t_30 += "\n                        </option>\n                    ";
;
}
t_30 += "\n                    ";
if(l_subtype != "free_tiny") {
t_30 += "\n                        <option id=\"tiny\" ";
if(l_default == "tiny") {
t_30 += "selected";
;
}
t_30 += " value=\"tiny\">\n                            ";
if(l_subtype == "guns") {
t_30 += "Feather\n                            ";
;
}
else {
if(l_subtype == "instruments") {
t_30 += "Saxophone\n                            ";
;
}
else {
if(l_subtype == "kong") {
t_30 += "Tiny\n                            ";
;
}
else {
if(l_subtype == "mport_to_helm") {
t_30 += "Monkeyport\n                            ";
;
}
else {
if(l_subtype == "free_lanky") {
t_30 += "Saxophone/Feather\n                            ";
;
}
else {
if(l_subtype == "free_tiny") {
t_30 += "You should not see this\n                            ";
;
}
;
}
;
}
;
}
;
}
;
}
t_30 += "\n                        </option>\n                    ";
;
}
t_30 += "\n                    ";
if(l_subtype != "mport_to_helm") {
t_30 += "\n                        <option id=\"chunky\" ";
if(l_default == "chunky") {
t_30 += "selected";
;
}
t_30 += " value=\"chunky\">\n                            ";
if(l_subtype == "guns") {
t_30 += "Pineapple\n                            ";
;
}
else {
if(l_subtype == "instruments") {
t_30 += "Triangle\n                            ";
;
}
else {
if(l_subtype == "kong") {
t_30 += "Chunky\n                            ";
;
}
else {
if(l_subtype == "mport_to_helm") {
t_30 += "You should not see this\n                            ";
;
}
else {
if(l_subtype == "free_lanky") {
t_30 += "Triangle/Pineapple\n                            ";
;
}
else {
if(l_subtype == "free_tiny") {
t_30 += "Primate Punch\n                            ";
;
}
;
}
;
}
;
}
;
}
;
}
t_30 += "\n                        </option>\n                    ";
;
}
t_30 += "\n                ";
;
}
else {
t_30 += "\n                    <option id=\"bongos\" ";
if(l_default == "bongos") {
t_30 += "selected";
;
}
t_30 += " value=\"bongos\">Bongos</option>\n                    <option id=\"guitar\" ";
if(l_default == "guitar") {
t_30 += "selected";
;
}
t_30 += " value=\"guitar\">Guitar</option>\n                    <option id=\"trombone\" ";
if(l_default == "trombone") {
t_30 += "selected";
;
}
t_30 += " value=\"trombone\">Trombone</option>\n                    <option id=\"sax\" ";
if(l_default == "sax") {
t_30 += "selected";
;
}
t_30 += " value=\"sax\">Saxophone</option>\n                    <option id=\"triangle\" ";
if(l_default == "triangle") {
t_30 += "selected";
;
}
t_30 += " value=\"triangle\">Triangle</option>\n                    <option id=\"lever\" ";
if(l_default == "lever") {
t_30 += "selected";
;
}
t_30 += " value=\"lever\">Grab Lever</option>\n                    <option id=\"gong\" ";
if(l_default == "gong") {
t_30 += "selected";
;
}
t_30 += " value=\"gong\">Gong</option>\n                    <option id=\"gone_pad\" ";
if(l_default == "gone_pad") {
t_30 += "selected";
;
}
t_30 += " value=\"gone_pad\">Gorilla Gone</option>\n                ";
;
}
t_30 += "\n                <option id=\"random\" ";
if(l_default == "random") {
t_30 += "selected";
;
}
t_30 += " value=\"random\">\n                    Random\n                </option>\n            </select>\n        </div>\n    </div>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_30);
});
context.addExport("switchsanity_option");
context.setVariable("switchsanity_option", macro_t_29);
output += "\n";
var macro_t_31 = runtime.makeMacro(
["behavior_name", "item_name", "selector_name", "min", "max", "tooltip"], 
[], 
function (l_behavior_name, l_item_name, l_selector_name, l_min, l_max, l_tooltip, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("behavior_name", l_behavior_name);
frame.set("item_name", l_item_name);
frame.set("selector_name", l_selector_name);
frame.set("min", l_min);
frame.set("max", l_max);
frame.set("tooltip", l_tooltip);
var t_32 = "";t_32 += "\n    <div class=\"item-select\">\n        <p class=\"select-title\">";
t_32 += runtime.suppressValue(l_selector_name, env.opts.autoescape);
t_32 += "</p>\n        <div class=\"d-flex select-number-container\" id=\"";
t_32 += runtime.suppressValue(l_behavior_name, env.opts.autoescape);
t_32 += "_container\">\n            <select name=\"";
t_32 += runtime.suppressValue(l_behavior_name, env.opts.autoescape);
t_32 += "\"\n                    id=\"";
t_32 += runtime.suppressValue(l_behavior_name, env.opts.autoescape);
t_32 += "\"\n                    display_name=\"";
t_32 += runtime.suppressValue(l_selector_name, env.opts.autoescape);
t_32 += "\"\n                    class=\"form-select center-div\"\n                    aria-label=\"Randomization type\"\n                    data-toggle=\"tooltip\"\n                    title=\"";
t_32 += runtime.suppressValue(l_tooltip, env.opts.autoescape);
t_32 += "\">\n                <option id=\"pre_selected\" value=\"pre_selected\">\n                    Pre-Selected\n                </option>\n                <option id=\"easy_random\" value=\"easy_random\">\n                    Easy Random\n                </option>\n                <option id=\"medium_random\" selected value=\"medium_random\">\n                    Normal Random\n                </option>\n                <option id=\"hard_random\" value=\"hard_random\">\n                    Hard Random\n                </option>\n                ";
if(l_behavior_name == "cb_medal_behavior_new") {
t_32 += "\n                    <option id=\"progressive\" value=\"progressive\">\n                        Progressive\n                    </option>\n                ";
;
}
t_32 += "\n            </select>\n            <input min=\"";
t_32 += runtime.suppressValue(l_min, env.opts.autoescape);
t_32 += "\"\n                max=\"";
t_32 += runtime.suppressValue(l_max, env.opts.autoescape);
t_32 += "\"\n                name=\"";
t_32 += runtime.suppressValue(l_item_name, env.opts.autoescape);
t_32 += "\"\n                id=\"";
t_32 += runtime.suppressValue(l_item_name, env.opts.autoescape);
t_32 += "\"\n                display_name=\"Troff 'n' Scoff Count\"\n                class=\"form-control center-div\"\n                type=\"number\"\n                data-toggle=\"tooltip\"\n                title=\"Amount of the item specified to complete the check.\"\n                default=\"";
t_32 += runtime.suppressValue(l_min, env.opts.autoescape);
t_32 += "\"\n                placeholder=\"";
t_32 += runtime.suppressValue(l_min, env.opts.autoescape);
t_32 += "\"/>\n        </div>\n    </div>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_32);
});
context.addExport("item_req_selector");
context.setVariable("item_req_selector", macro_t_31);
output += "\n";
var macro_t_33 = runtime.makeMacro(
[], 
[], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
var t_34 = "";t_34 += "\n    <li>\n        <a\n            class=\"py-2\"\n            id=\"lock-nav-panel\"\n        >\n            <i class=\"fa fa-lock-open fa-2x\" id=\"lock-nav-panel-unlock\" hidden></i>\n            <i class=\"fa fa-lock\" id=\"lock-nav-panel-lock\"></i>\n            <span class=\"nav-text\">\n                <div class=\"position-absolute top-50 start-0 translate-middle-y\">Lock Panel</div>\n            </span>\n        </a>\n    </li>\n    <script>\n        document.getElementById(\"lock-nav-panel\").addEventListener(\"click\", (e) => {\n            const tab_list = document.getElementById(\"nav-tab-list\");\n            const panel = document.getElementById(\"lock-nav-panel\");\n            tab_list.classList.toggle(\"expanded\");\n            const expanded = tab_list.classList.contains(\"expanded\");\n            panel.getElementsByTagName(\"div\")[0].innerText = expanded ? \"Unlock Panel\" : \"Lock Panel\";\n            const lock_icon = document.getElementById(\"lock-nav-panel-lock\");\n            const unlock_icon = document.getElementById(\"lock-nav-panel-unlock\");\n            if (expanded) {\n                lock_icon.setAttribute(\"hidden\", \"hidden\");\n                unlock_icon.removeAttribute(\"hidden\");\n            } else {\n                unlock_icon.setAttribute(\"hidden\", \"hidden\");\n                lock_icon.removeAttribute(\"hidden\");\n            }\n        });\n    </script>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_34);
});
context.addExport("lock_tab");
context.setVariable("lock_tab", macro_t_33);
output += "\n";
var macro_t_35 = runtime.makeMacro(
["internal_name", "tab_icon", "tab_name", "first", "hidden"], 
[], 
function (l_internal_name, l_tab_icon, l_tab_name, l_first, l_hidden, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("internal_name", l_internal_name);
frame.set("tab_icon", l_tab_icon);
frame.set("tab_name", l_tab_name);
frame.set("first", l_first);
frame.set("hidden", l_hidden);
var t_36 = "";t_36 += "\n    <li role=\"presentation\">\n        <a\n            class=\"";
if(l_first) {
t_36 += "active";
;
}
t_36 += " py-2\"\n            id=\"nav-";
t_36 += runtime.suppressValue(l_internal_name, env.opts.autoescape);
t_36 += "-tab\"\n            data-bs-toggle=\"tab\"\n            data-bs-target=\"#nav-";
t_36 += runtime.suppressValue(l_internal_name, env.opts.autoescape);
t_36 += "\"\n            type=\"button\"\n            role=\"tab\"\n            aria-controls=\"nav-";
t_36 += runtime.suppressValue(l_internal_name, env.opts.autoescape);
t_36 += "\"\n            aria-selected=\"";
t_36 += runtime.suppressValue((l_first?"true":"false"), env.opts.autoescape);
t_36 += "\"\n            ";
if(l_hidden) {
t_36 += "hidden";
;
}
t_36 += "\n        >\n            <i class=\"fa ";
t_36 += runtime.suppressValue(l_tab_icon, env.opts.autoescape);
t_36 += "\"></i>\n            <span class=\"nav-text\">\n                <div class=\"position-absolute top-50 start-0 translate-middle-y\">";
t_36 += runtime.suppressValue(l_tab_name, env.opts.autoescape);
t_36 += "</div>\n            </span>\n        </a>\n    </li>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_36);
});
context.addExport("gen_tab");
context.setVariable("gen_tab", macro_t_35);
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
output += "\n";
env.getTemplate("dropdown_multiselector.html", false, "music.html", false, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
t_6.getExported(function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
if(Object.prototype.hasOwnProperty.call(t_6, "dropdown_multiselector")) {
var t_9 = t_6.dropdown_multiselector;
} else {
cb(new Error("cannot import 'dropdown_multiselector'")); return;
}
context.setVariable("dropdown_multiselector", t_9);
output += "\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div class=\"row\">\n        <div class=\"col border panel\">\n            <h2 class=\"title\">MUSIC RANDO\n                <label data-toggle=\"tooltip\" \n                        title=\"Randomizes all Music Selections.\" class=\"ui-music-no-cosmetic\">\n                    <input class=\"dice_checkbox\"\n                            type=\"checkbox\"\n                            name=\"random_music\"\n                            id=\"random_music\"\n                            display_name=\"Random Music\"\n                            value=\"True\"/>\n                    <label for=\"random_music\"></label>\n                </label>\n            </h2>\n            <input\n                type=\"checkbox\"\n                name=\"music_is_custom\"\n                id=\"music_is_custom\"\n                value=\"True\"\n                hidden />\n            <div class=\"ui-music-has-cosmetic\" hidden>\n                <div class=\"alert alert-success\" role=\"alert\">\n                    Custom Music detected in cosmetic pack - Custom Music Enabled.\n                </div>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch ui-music-no-cosmetic\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Randomizes Background Music.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"music_bgm_randomized\"\n                                id=\"music_bgm_randomized\"\n                                display_name=\"Random Background Music\"\n                                value=\"True\"/>\n                        Random Background Music\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch ui-music-no-cosmetic\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Randomizes Major Item Themes.\">\n                        <input class=\"form-check-input\"\n                            type=\"checkbox\"\n                            name=\"music_majoritems_randomized\"\n                            id=\"music_majoritems_randomized\"\n                            display_name=\"Random Major Item Themes\"\n                            value=\"True\"/>\n                        Random Major Item Themes\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch ui-music-no-cosmetic\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Randomizes Minor Item Themes.\">\n                        <input class=\"form-check-input\"\n                            type=\"checkbox\"\n                            name=\"music_minoritems_randomized\"\n                            id=\"music_minoritems_randomized\"\n                            display_name=\"Random Minor Item Themes\"\n                            value=\"True\"/>\n                        Random Minor Item Themes\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch ui-music-no-cosmetic\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Randomizes Event Themes.\">\n                        <input class=\"form-check-input\"\n                            type=\"checkbox\"\n                            name=\"music_events_randomized\"\n                            id=\"music_events_randomized\"\n                            display_name=\"Random Event Themes\"\n                            value=\"True\"/>\n                        Random Event Themes\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"If true, vanilla songs will not be shuffled anywhere but their original locations.\">\n                        <input class=\"form-check-input\"\n                            type=\"checkbox\"\n                            name=\"music_vanilla_locations\"\n                            id=\"music_vanilla_locations\"\n                            display_name=\"Keep Vanilla Song Placement\"\n                            value=\"True\"/>\n                        Keep Vanilla Song Placement\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                    title=\"If true, songs will not have additional reverb while underwater or in tunnels.\">\n                        <input class=\"form-check-input\"\n                        type=\"checkbox\"\n                        name=\"music_disable_reverb\"\n                        id=\"music_disable_reverb\"\n                        display_name=\"Disable Dynamic Reverb\"\n                        value=\"True\"/>\n                        Disable Dynamic Reverb\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                    title=\"If true, Isles will play music everywhere, even between the Islands, where in vanilla it'd be silent.\">\n                        <input class=\"form-check-input\"\n                        type=\"checkbox\"\n                        name=\"isles_cool_musical\"\n                        id=\"isles_cool_musical\"\n                        display_name=\"Remove Silent Isles\"\n                        value=\"True\"/>\n                        Remove Silent Isles\n                    </label>\n                </div>\n                ";
output += runtime.suppressValue((lineno = 113, colno = 41, runtime.callWrap(t_9, "dropdown_multiselector", context, [runtime.contextOrFrameLookup(context, frame, "excluded_songs"),"excluded_songs","Disabled Songs","This will open a dropdown that will let you customize what songs are disabled.",4])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 114, colno = 41, runtime.callWrap(t_9, "dropdown_multiselector", context, [runtime.contextOrFrameLookup(context, frame, "song_filters"),"music_filtering","Music Filtering","This will open a dropdown that will let you customize how the game applies additional filters."])), env.opts.autoescape);
output += "\n            </div>\n        </div>\n        <div class=\"col border panel\">\n            <h2 class=\"title\">CUSTOM MUSIC</h2>\n            <p class=\"select-title\">Cosmetics ZIP (Check <a style=\"text-decoration:underline\" target=\"_blank\" href=\"./wiki/Creating-Cosmetics-Data-packs.html\">wiki</a> for format)</p>\n            <div class=\"input-group mb-3 file-select\"\n                 style=\"margin: 0 auto\">\n                <div class=\"input-group-text choose-file\"\n                     style=\"background-color: #6c757d\">\n                    <input class=\"btn btn-secondary file-button\"\n                           type=\"button\"\n                           value=\"Choose File\"\n                           onClick=\"music_filebox()\"\n                           id=\"choose_music_file\">\n                </div>\n                <input class=\"form-control\"\n                       id=\"music_file_text\"\n                       type=\"text\"\n                       readonly\n                       onClick=\"music_filebox()\"\n                       placeholder=\"No File Chosen\"/>\n            </div>\n            <div class=\"flex-container\">\n                ";
output += runtime.suppressValue((lineno = 138, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["fill_with_custom_music","Fill game with provided songs","Will fill each song slot available with a custom track, even if the amount of songs in that pack doesn't exceed the amount of song slots."])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 139, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["show_song_name","Display song name in-game","Will display the song name for 2 seconds upon it playing (Only applies to BGM)."])), env.opts.autoescape);
output += "\n            </div>\n            <div class=\"flex-container\">\n                <div style=\"width:50%\">\n                    <div class=\"item-group\" style=\"margin-left:auto;margin-right:auto;max-width:200px;\">\n                        <p class=\"select-title\">Custom Music Fill (%)</p>\n                        <input class=\"form-control\"\n                            min=\"0\"\n                            max=\"100\"\n                            name=\"custom_music_proportion\"\n                            id=\"custom_music_proportion\"\n                            display_name=\"Custom Music Fill\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"Proportion of songs that will be filled with custom music.\"\n                            default=\"100\"\n                            placeholder=\"100\"/>\n                    </div>\n                </div>\n                <div class=\"spacer\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"container border\"\n     id=\"select_songs_panel\"\n     style=\"padding-bottom: 24px;\">\n    <h2 class=\"title\">Select Songs</h2>\n    <div class=\"flex-container flex-center import-export-container\">\n        <input id=\"import_music_selections\"\n               class=\"btn btn-secondary settings-button\"\n               type=\"button\"\n               onClick=\"music_selection_filebox()\"\n               value=\"Import Selections from File\"/>\n        <input id=\"export_music_selections\"\n               class=\"btn btn-secondary settings-button\"\n               type=\"button\"\n               value=\"Export Selections to File\"/>\n        <input id=\"reset_music_selections\"\n               class=\"btn btn-secondary settings-button\"\n               type=\"button\"\n               value=\"Reset Selections\"/>\n    </div>\n    <div class=\"import-errors\"\n         id=\"music_import_errors\"\n         style=\"display: none;\">\n    </div>\n    <div>\n        ";
frame = frame.push();
var t_12 = runtime.contextOrFrameLookup(context, frame, "select_song_panel");
if(t_12) {t_12 = runtime.fromIterator(t_12);
var t_10;
if(runtime.isArray(t_12)) {
var t_11 = t_12.length;
for(t_10=0; t_10 < t_12.length; t_10++) {
var t_13 = t_12[t_10][0];
frame.set("[object Object]", t_12[t_10][0]);
var t_14 = t_12[t_10][1];
frame.set("[object Object]", t_12[t_10][1]);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
output += "\n            <div class=\"flex-container flex-center expandable-toggle\"\n                 id=\"";
output += runtime.suppressValue(t_13, env.opts.autoescape);
output += "_collapse_toggle\">\n                <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_14),"name"), env.opts.autoescape);
output += "</h3>\n                <img src=\"static/img/expand_arrow.png\"\n                     class=\"expand-arrow ";
output += runtime.suppressValue(t_13, env.opts.autoescape);
output += "-expand-arrow\">\n            </div>\n            <div class=\"flex-container flex-center expandable-container collapsed\"\n                 id=\"";
output += runtime.suppressValue(t_13, env.opts.autoescape);
output += "\">\n                ";
frame = frame.push();
var t_17 = runtime.memberLookup((t_14),"subcategories");
if(t_17) {t_17 = runtime.fromIterator(t_17);
var t_15;
if(runtime.isArray(t_17)) {
var t_16 = t_17.length;
for(t_15=0; t_15 < t_17.length; t_15++) {
var t_18 = t_17[t_15][0];
frame.set("[object Object]", t_17[t_15][0]);
var t_19 = t_17[t_15][1];
frame.set("[object Object]", t_17[t_15][1]);
frame.set("loop.index", t_15 + 1);
frame.set("loop.index0", t_15);
frame.set("loop.revindex", t_16 - t_15);
frame.set("loop.revindex0", t_16 - t_15 - 1);
frame.set("loop.first", t_15 === 0);
frame.set("loop.last", t_15 === t_16 - 1);
frame.set("loop.length", t_16);
output += "\n                    <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_19),"name"), env.opts.autoescape);
output += "</h3>\n                    <div class=\"flex-container flex-center\">\n                        ";
frame = frame.push();
var t_22 = runtime.memberLookup((t_19),"songs");
if(t_22) {t_22 = runtime.fromIterator(t_22);
var t_21 = t_22.length;
for(var t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20];
frame.set("song", t_23);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
output += "\n                            <div class=\"location-picker\">\n                                <label for=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_23),"value"), env.opts.autoescape);
output += "\" class=\"location-label\">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_23),"name"), env.opts.autoescape);
output += "\n                                </label>\n                                <div id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_23),"value"), env.opts.autoescape);
output += "_wrapper\"\n                                    data-toggle=\"tooltip\"\n                                    title>\n                                    <select id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_23),"value"), env.opts.autoescape);
output += "\"\n                                            name=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_23),"value"), env.opts.autoescape);
output += "\"\n                                            class=\"form-select ";
output += runtime.suppressValue(runtime.memberLookup((t_19),"type"), env.opts.autoescape);
output += "-select\">\n                                        <option value=\"default_value\">-- Default --</option>\n                                        <option value=\"\" selected>-- Randomize --</option>\n                                        ";
frame = frame.push();
var t_26 = env.getFilter("music_select_restrict").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "select_songs")),runtime.memberLookup((t_19),"type")),runtime.memberLookup((t_23),"value"));
if(t_26) {t_26 = runtime.fromIterator(t_26);
var t_25 = t_26.length;
for(var t_24=0; t_24 < t_26.length; t_24++) {
var t_27 = t_26[t_24];
frame.set("select_song", t_27);
frame.set("loop.index", t_24 + 1);
frame.set("loop.index0", t_24);
frame.set("loop.revindex", t_25 - t_24);
frame.set("loop.revindex0", t_25 - t_24 - 1);
frame.set("loop.first", t_24 === 0);
frame.set("loop.last", t_24 === t_25 - 1);
frame.set("loop.length", t_25);
output += "\n                                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_27),"value"), env.opts.autoescape);
output += "\"\n                                                    class=\"original-song\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_27),"name"), env.opts.autoescape);
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
t_15 = -1;
var t_16 = runtime.keys(t_17).length;
for(var t_28 in t_17) {
t_15++;
var t_29 = t_17[t_28];
frame.set("subCatName", t_28);
frame.set("subCategory", t_29);
frame.set("loop.index", t_15 + 1);
frame.set("loop.index0", t_15);
frame.set("loop.revindex", t_16 - t_15);
frame.set("loop.revindex0", t_16 - t_15 - 1);
frame.set("loop.first", t_15 === 0);
frame.set("loop.last", t_15 === t_16 - 1);
frame.set("loop.length", t_16);
output += "\n                    <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_29),"name"), env.opts.autoescape);
output += "</h3>\n                    <div class=\"flex-container flex-center\">\n                        ";
frame = frame.push();
var t_32 = runtime.memberLookup((t_29),"songs");
if(t_32) {t_32 = runtime.fromIterator(t_32);
var t_31 = t_32.length;
for(var t_30=0; t_30 < t_32.length; t_30++) {
var t_33 = t_32[t_30];
frame.set("song", t_33);
frame.set("loop.index", t_30 + 1);
frame.set("loop.index0", t_30);
frame.set("loop.revindex", t_31 - t_30);
frame.set("loop.revindex0", t_31 - t_30 - 1);
frame.set("loop.first", t_30 === 0);
frame.set("loop.last", t_30 === t_31 - 1);
frame.set("loop.length", t_31);
output += "\n                            <div class=\"location-picker\">\n                                <label for=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_33),"value"), env.opts.autoescape);
output += "\" class=\"location-label\">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_33),"name"), env.opts.autoescape);
output += "\n                                </label>\n                                <div id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_33),"value"), env.opts.autoescape);
output += "_wrapper\"\n                                    data-toggle=\"tooltip\"\n                                    title>\n                                    <select id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_33),"value"), env.opts.autoescape);
output += "\"\n                                            name=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_33),"value"), env.opts.autoescape);
output += "\"\n                                            class=\"form-select ";
output += runtime.suppressValue(runtime.memberLookup((t_29),"type"), env.opts.autoescape);
output += "-select\">\n                                        <option value=\"default_value\">-- Default --</option>\n                                        <option value=\"\" selected>-- Randomize --</option>\n                                        ";
frame = frame.push();
var t_36 = env.getFilter("music_select_restrict").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "select_songs")),runtime.memberLookup((t_29),"type")),runtime.memberLookup((t_33),"value"));
if(t_36) {t_36 = runtime.fromIterator(t_36);
var t_35 = t_36.length;
for(var t_34=0; t_34 < t_36.length; t_34++) {
var t_37 = t_36[t_34];
frame.set("select_song", t_37);
frame.set("loop.index", t_34 + 1);
frame.set("loop.index0", t_34);
frame.set("loop.revindex", t_35 - t_34);
frame.set("loop.revindex0", t_35 - t_34 - 1);
frame.set("loop.first", t_34 === 0);
frame.set("loop.last", t_34 === t_35 - 1);
frame.set("loop.length", t_35);
output += "\n                                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_37),"value"), env.opts.autoescape);
output += "\"\n                                                    class=\"original-song\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_37),"name"), env.opts.autoescape);
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
t_10 = -1;
var t_11 = runtime.keys(t_12).length;
for(var t_38 in t_12) {
t_10++;
var t_39 = t_12[t_38];
frame.set("categoryName", t_38);
frame.set("category", t_39);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
output += "\n            <div class=\"flex-container flex-center expandable-toggle\"\n                 id=\"";
output += runtime.suppressValue(t_38, env.opts.autoescape);
output += "_collapse_toggle\">\n                <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_39),"name"), env.opts.autoescape);
output += "</h3>\n                <img src=\"static/img/expand_arrow.png\"\n                     class=\"expand-arrow ";
output += runtime.suppressValue(t_38, env.opts.autoescape);
output += "-expand-arrow\">\n            </div>\n            <div class=\"flex-container flex-center expandable-container collapsed\"\n                 id=\"";
output += runtime.suppressValue(t_38, env.opts.autoescape);
output += "\">\n                ";
frame = frame.push();
var t_42 = runtime.memberLookup((t_39),"subcategories");
if(t_42) {t_42 = runtime.fromIterator(t_42);
var t_40;
if(runtime.isArray(t_42)) {
var t_41 = t_42.length;
for(t_40=0; t_40 < t_42.length; t_40++) {
var t_43 = t_42[t_40][0];
frame.set("[object Object]", t_42[t_40][0]);
var t_44 = t_42[t_40][1];
frame.set("[object Object]", t_42[t_40][1]);
frame.set("loop.index", t_40 + 1);
frame.set("loop.index0", t_40);
frame.set("loop.revindex", t_41 - t_40);
frame.set("loop.revindex0", t_41 - t_40 - 1);
frame.set("loop.first", t_40 === 0);
frame.set("loop.last", t_40 === t_41 - 1);
frame.set("loop.length", t_41);
output += "\n                    <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_44),"name"), env.opts.autoescape);
output += "</h3>\n                    <div class=\"flex-container flex-center\">\n                        ";
frame = frame.push();
var t_47 = runtime.memberLookup((t_44),"songs");
if(t_47) {t_47 = runtime.fromIterator(t_47);
var t_46 = t_47.length;
for(var t_45=0; t_45 < t_47.length; t_45++) {
var t_48 = t_47[t_45];
frame.set("song", t_48);
frame.set("loop.index", t_45 + 1);
frame.set("loop.index0", t_45);
frame.set("loop.revindex", t_46 - t_45);
frame.set("loop.revindex0", t_46 - t_45 - 1);
frame.set("loop.first", t_45 === 0);
frame.set("loop.last", t_45 === t_46 - 1);
frame.set("loop.length", t_46);
output += "\n                            <div class=\"location-picker\">\n                                <label for=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_48),"value"), env.opts.autoescape);
output += "\" class=\"location-label\">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_48),"name"), env.opts.autoescape);
output += "\n                                </label>\n                                <div id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_48),"value"), env.opts.autoescape);
output += "_wrapper\"\n                                    data-toggle=\"tooltip\"\n                                    title>\n                                    <select id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_48),"value"), env.opts.autoescape);
output += "\"\n                                            name=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_48),"value"), env.opts.autoescape);
output += "\"\n                                            class=\"form-select ";
output += runtime.suppressValue(runtime.memberLookup((t_44),"type"), env.opts.autoescape);
output += "-select\">\n                                        <option value=\"default_value\">-- Default --</option>\n                                        <option value=\"\" selected>-- Randomize --</option>\n                                        ";
frame = frame.push();
var t_51 = env.getFilter("music_select_restrict").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "select_songs")),runtime.memberLookup((t_44),"type")),runtime.memberLookup((t_48),"value"));
if(t_51) {t_51 = runtime.fromIterator(t_51);
var t_50 = t_51.length;
for(var t_49=0; t_49 < t_51.length; t_49++) {
var t_52 = t_51[t_49];
frame.set("select_song", t_52);
frame.set("loop.index", t_49 + 1);
frame.set("loop.index0", t_49);
frame.set("loop.revindex", t_50 - t_49);
frame.set("loop.revindex0", t_50 - t_49 - 1);
frame.set("loop.first", t_49 === 0);
frame.set("loop.last", t_49 === t_50 - 1);
frame.set("loop.length", t_50);
output += "\n                                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_52),"value"), env.opts.autoescape);
output += "\"\n                                                    class=\"original-song\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_52),"name"), env.opts.autoescape);
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
t_40 = -1;
var t_41 = runtime.keys(t_42).length;
for(var t_53 in t_42) {
t_40++;
var t_54 = t_42[t_53];
frame.set("subCatName", t_53);
frame.set("subCategory", t_54);
frame.set("loop.index", t_40 + 1);
frame.set("loop.index0", t_40);
frame.set("loop.revindex", t_41 - t_40);
frame.set("loop.revindex0", t_41 - t_40 - 1);
frame.set("loop.first", t_40 === 0);
frame.set("loop.last", t_40 === t_41 - 1);
frame.set("loop.length", t_41);
output += "\n                    <h3 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((t_54),"name"), env.opts.autoescape);
output += "</h3>\n                    <div class=\"flex-container flex-center\">\n                        ";
frame = frame.push();
var t_57 = runtime.memberLookup((t_54),"songs");
if(t_57) {t_57 = runtime.fromIterator(t_57);
var t_56 = t_57.length;
for(var t_55=0; t_55 < t_57.length; t_55++) {
var t_58 = t_57[t_55];
frame.set("song", t_58);
frame.set("loop.index", t_55 + 1);
frame.set("loop.index0", t_55);
frame.set("loop.revindex", t_56 - t_55);
frame.set("loop.revindex0", t_56 - t_55 - 1);
frame.set("loop.first", t_55 === 0);
frame.set("loop.last", t_55 === t_56 - 1);
frame.set("loop.length", t_56);
output += "\n                            <div class=\"location-picker\">\n                                <label for=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_58),"value"), env.opts.autoescape);
output += "\" class=\"location-label\">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup((t_58),"name"), env.opts.autoescape);
output += "\n                                </label>\n                                <div id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_58),"value"), env.opts.autoescape);
output += "_wrapper\"\n                                    data-toggle=\"tooltip\"\n                                    title>\n                                    <select id=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_58),"value"), env.opts.autoescape);
output += "\"\n                                            name=\"music_select_";
output += runtime.suppressValue(runtime.memberLookup((t_58),"value"), env.opts.autoescape);
output += "\"\n                                            class=\"form-select ";
output += runtime.suppressValue(runtime.memberLookup((t_54),"type"), env.opts.autoescape);
output += "-select\">\n                                        <option value=\"default_value\">-- Default --</option>\n                                        <option value=\"\" selected>-- Randomize --</option>\n                                        ";
frame = frame.push();
var t_61 = env.getFilter("music_select_restrict").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "select_songs")),runtime.memberLookup((t_54),"type")),runtime.memberLookup((t_58),"value"));
if(t_61) {t_61 = runtime.fromIterator(t_61);
var t_60 = t_61.length;
for(var t_59=0; t_59 < t_61.length; t_59++) {
var t_62 = t_61[t_59];
frame.set("select_song", t_62);
frame.set("loop.index", t_59 + 1);
frame.set("loop.index0", t_59);
frame.set("loop.revindex", t_60 - t_59);
frame.set("loop.revindex0", t_60 - t_59 - 1);
frame.set("loop.first", t_59 === 0);
frame.set("loop.last", t_59 === t_60 - 1);
frame.set("loop.length", t_60);
output += "\n                                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_62),"value"), env.opts.autoescape);
output += "\"\n                                                    class=\"original-song\">\n                                                ";
output += runtime.suppressValue(runtime.memberLookup((t_62),"name"), env.opts.autoescape);
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
output += "\n    </div>\n</div>\n<script>\n    $(function() {\n        var pattern = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];\n        var current = 0;\n\n        var keyHandler = function (event) {\n            // If the key isn't in the pattern, or isn't the current key in the pattern, reset\n            if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {\n                current = 0;\n                return;\n            }\n            // Update how much of the pattern is complete\n            current++;\n            // If complete, remove hidden and reset\n            if (pattern.length === current) {\n                current = 0;\n                $('.holiday').removeAttr('hidden');\n            }\n        };\n        // Listen for keydown events\n        document.addEventListener('keydown', keyHandler, false);\n    });\n</script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
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
env.getTemplate("macros.html", false, "nav-tabs.html", false, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(Object.prototype.hasOwnProperty.call(t_1, "gen_tab")) {
var t_4 = t_1.gen_tab;
} else {
cb(new Error("cannot import 'gen_tab'")); return;
}
context.setVariable("gen_tab", t_4);
if(Object.prototype.hasOwnProperty.call(t_1, "lock_tab")) {
var t_5 = t_1.lock_tab;
} else {
cb(new Error("cannot import 'lock_tab'")); return;
}
context.setVariable("lock_tab", t_5);
output += "\n<ul id=\"rando_tabs\" role=\"tablist\">\n    ";
output += runtime.suppressValue((lineno = 2, colno = 14, runtime.callWrap(t_4, "gen_tab", context, ["started","fa-bars-progress","Getting Started",true,false])), env.opts.autoescape);
output += "\n    ";
output += runtime.suppressValue((lineno = 3, colno = 14, runtime.callWrap(t_4, "gen_tab", context, ["item","fa-crown","Items",false,false])), env.opts.autoescape);
output += "\n    ";
output += runtime.suppressValue((lineno = 4, colno = 14, runtime.callWrap(t_4, "gen_tab", context, ["requirements","fa-list-check","Requirements",false,false])), env.opts.autoescape);
output += "\n    ";
output += runtime.suppressValue((lineno = 5, colno = 14, runtime.callWrap(t_4, "gen_tab", context, ["overworld","fa-globe","Overworld",false,false])), env.opts.autoescape);
output += "\n    ";
output += runtime.suppressValue((lineno = 6, colno = 14, runtime.callWrap(t_4, "gen_tab", context, ["progression","fa-stopwatch-20","Endgame",false,false])), env.opts.autoescape);
output += "\n    ";
output += runtime.suppressValue((lineno = 7, colno = 14, runtime.callWrap(t_4, "gen_tab", context, ["qol","fa-thumbs-up","Quality of Life",false,false])), env.opts.autoescape);
output += "\n    ";
output += runtime.suppressValue((lineno = 8, colno = 14, runtime.callWrap(t_4, "gen_tab", context, ["cosmetics","fa-palette","Cosmetics",false,false])), env.opts.autoescape);
output += "\n    ";
output += runtime.suppressValue((lineno = 9, colno = 14, runtime.callWrap(t_4, "gen_tab", context, ["music","fa-music","Music",false,false])), env.opts.autoescape);
output += "\n    ";
output += runtime.suppressValue((lineno = 10, colno = 14, runtime.callWrap(t_4, "gen_tab", context, ["plando","fa-scroll","Plandomizer",false,true])), env.opts.autoescape);
output += "\n    ";
output += runtime.suppressValue((lineno = 11, colno = 14, runtime.callWrap(t_4, "gen_tab", context, ["settings","fa-file-lines","Settings",false,true])), env.opts.autoescape);
output += "\n    ";
output += "\n</ul>";
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
if(Object.prototype.hasOwnProperty.call(t_1, "toggle_input")) {
var t_4 = t_1.toggle_input;
} else {
cb(new Error("cannot import 'toggle_input'")); return;
}
context.setVariable("toggle_input", t_4);
if(Object.prototype.hasOwnProperty.call(t_1, "list_selector")) {
var t_5 = t_1.list_selector;
} else {
cb(new Error("cannot import 'list_selector'")); return;
}
context.setVariable("list_selector", t_5);
if(Object.prototype.hasOwnProperty.call(t_1, "properties_selector")) {
var t_6 = t_1.properties_selector;
} else {
cb(new Error("cannot import 'properties_selector'")); return;
}
context.setVariable("properties_selector", t_6);
output += "\n";
env.getTemplate("dropdown_multiselector.html", false, "overworld.html", false, function(t_8,t_7) {
if(t_8) { cb(t_8); return; }
t_7.getExported(function(t_9,t_7) {
if(t_9) { cb(t_9); return; }
if(Object.prototype.hasOwnProperty.call(t_7, "dropdown_multiselector")) {
var t_10 = t_7.dropdown_multiselector;
} else {
cb(new Error("cannot import 'dropdown_multiselector'")); return;
}
context.setVariable("dropdown_multiselector", t_10);
output += "\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div class=\"row\">\n        <div class=\"col border panel\">\n            <h2 class=\"title\">WORLD NAVIGATION</h2>\n            <div class=\"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Entrance Randomizer</p>\n                    <select name=\"level_randomization\"\n                            id=\"level_randomization\"\n                            display_name=\"Entrance Randomizer\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Determines how entrances are randomized and placed.&#10;-Level Order: Randomize only the order that the levels are in.&#10;-Complex Level Order: Same as 'Level Order', but the order of level entry won't be linear. Additionally, other protections that regular Level Order enforces to make it better to play will be removed.&#10;-Loading Zones: Randomize every entrance except for Helm/Helm Lobby.&#10;-Decoupled Loading Zones: Randomize every entrance except for Helm/Helm Lobby. Going back through a entrance will take you somewhere else.&#10;-Vanilla: All entrances are the same as the base game.\">\n                        <option selected value=\"level_order\">\n                            Level Order\n                        </option>\n                        <option value=\"level_order_complex\">\n                            Complex Level Order\n                        </option>\n                        <option value=\"loadingzone\">\n                            Loading Zones\n                        </option>\n                        <option value=\"loadingzonesdecoupled\">\n                            Decoupled Loading Zones\n                        </option>\n                        <option value=\"vanilla\">\n                            Vanilla\n                        </option>\n                    </select>\n                    <div class=\"form-check form-switch\" style=\"padding-top:10px;\">\n                        <label data-toggle=\"tooltip\"\n                                style=\"font-size:14px;\"\n                                title=\"Shuffle the location of Hideout Helm. If enabled, Helm and Helm Lobby will be in random locations.\">\n                            <input class=\"form-check-input\"\n                                    type=\"checkbox\"\n                                    name=\"shuffle_helm_location\"\n                                    id=\"shuffle_helm_location\"\n                                    display_name=\"Shuffle Helm Location / Include Helm\"\n                                    value=\"True\"/>\n                            <span id=\"shuffle_helm_location_label\">Shuffle Helm Location</span>\n                        </label>\n                    </div>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Cross-Map Bananaports</p>\n                    <select name=\"bananaport_rando\"\n                            id=\"bananaport_rando\"\n                            display_name=\"Cross-Map Bananaports\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Random mappings of bananaport locations.\">\n                        <option id=\"off\" selected value=\"off\">\n                            Off\n                        </option>\n                        <option id=\"crossmap_coupled\" value=\"crossmap_coupled\" title=\"Taking a Bananaport may take you to a different level.\">\n                            Coupled\n                        </option>\n                        <option id=\"crossmap_decoupled\" value=\"crossmap_decoupled\" title=\"Taking a Bananaport may take you to a different level. Going back through a Bananaport will take you somewhere else.\">\n                            Decoupled\n                        </option>\n                    </select>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Random Starting Location</p>\n                    <select name=\"random_starting_region_new\"\n                            id=\"random_starting_region_new\"\n                            display_name=\"Random Starting Location\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Randomizes the location you spawn in when starting a new file and when selecting the 'Exit to Spawn' option.\">\n                        <option id=\"off\" selected value=\"off\">\n                            Off\n                        </option>\n                        <option id=\"isles_only\" value=\"isles_only\" title=\"Will only spawn you in the Isles Main map.\">\n                            Isles Main Only\n                        </option>\n                        <option id=\"all\" value=\"all\" title=\"Will spawn you from any map.\">\n                            On\n                        </option>\n                    </select>\n                </div>\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("complex-options/kong-models.html", false, "overworld.html", false, function(t_12,t_11) {
if(t_12) { cb(t_12); return; }
callback(null,t_11);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_14,t_13) {
if(t_14) { cb(t_14); return; }
callback(null,t_13);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n            </div>\n            <hr />\n            <h2 class=\"title\">LOCATION RANDOMIZERS</h2>\n            <div class=\"flex-container\">\n                ";
output += runtime.suppressValue((lineno = 91, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["random_patches","Random Dirt Patch Locations","Dirt Patches for Rainbow Coins are in random locations.",runtime.contextOrFrameLookup(context, frame, "False"),"Dirt Patches"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 92, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["coin_rando","Random Banana Coin Locations","Shuffle the locations of coins within each Level.",runtime.contextOrFrameLookup(context, frame, "False"),"Banana Coins"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 93, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["race_coin_rando","Random Race Coin Locations","Shuffle the locations of race coins to be placed inside levels instead of courses. You will have to pick up enough race coins in the levels in order to beat a race. Any minecart section will be auto-completed upon entering the course with enough coins. Other races will still require winning the race. Obtaining a race reward does not consume coins.",runtime.contextOrFrameLookup(context, frame, "False"),"Race Coins"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 94, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["random_fairies","Random Banana Fairy Locations","Fairy checks are in random locations.",runtime.contextOrFrameLookup(context, frame, "False"),"Banana Fairies"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 95, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["crown_placement_rando","Random Battle Crown Pad Locations","Crown Locations are randomized. There's 1 in each level, except Isles which has two.",runtime.contextOrFrameLookup(context, frame, "False"),"Battle Crowns"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 96, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["random_crates","Random Melon Crate Locations","Melon Crate Locations are randomized.",runtime.contextOrFrameLookup(context, frame, "False"),"Melon Crates"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 97, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["randomize_pickups","Randomize Pickups","All Replenishables in the game are randomized.&#10;*Homing Ammo, Regular Ammo, Oranges, Film, Crystals"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 98, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["shuffle_shops","Shuffle Shop Locations","Shuffle the locations of shops (including Snides) within each Level/Isles."])), env.opts.autoescape);
output += "\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Colored Banana Locations are randomized.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"cb_rando_enabled\"\n                                id=\"cb_rando_enabled\"\n                                display_name=\"Randomize CB Locations\"\n                                value=\"True\"/>\n                        Colored Bananas\n                    </label>\n                    ";
output += runtime.suppressValue((lineno = 110, colno = 36, runtime.callWrap(t_5, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "cb_rando_levels"),"cb_rando_list","LEVELS","This will open a popup that will let you customize what levels have CB rando in the game.&#10;This defaults to All options.",8,1])), env.opts.autoescape);
output += "\n                ";
output += "\n                <div class=\"spacer\"></div>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Kasplats</p>\n                    <select name=\"kasplat_rando_setting\"\n                            id=\"kasplat_rando_setting\"\n                            display_name=\"Random Kasplat Locations\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Determines if and how Kasplats are randomized.&#10;-Vanilla: Kasplats are in their vanilla locations.&#10;-Vanilla Locations: Random placement of kasplats between existing spawns.&#10;-Location Shuffle: Random placement of kasplats with new and interesting locations.\">\n                        <option id=\"off\" selected value=\"off\">\n                            Vanilla\n                        </option>\n                        <option id=\"vanilla_locations\" value=\"vanilla_locations\">\n                            Vanilla Locations\n                        </option>\n                        <option id=\"location_shuffle\" value=\"location_shuffle\">\n                            Location Shuffle\n                        </option>\n                    </select>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Bananaports</p>\n                    <div class=\"d-flex\">\n                        <select name=\"bananaport_placement_rando\"\n                                id=\"bananaport_placement_rando\"\n                                display_name=\"Random Bananaport Locations\"\n                                class=\"form-select\"\n                                aria-label=\"Randomization type\"\n                                data-toggle=\"tooltip\"\n                                title=\"Shuffle the locations of bananaports within each Level.&#10;-Off: Bananaports are in their vanilla locations.&#10;-Vanilla Only: Random placement of bananaports solely within the pool of vanilla locations.&#10;-Half-Vanilla: One bananaport in each pair is vanilla, the other is in a random location.&#10;-On: Both bananaports in each pair are in a random location (with a couple exceptions for technical reasons).\">\n                            <option id=\"off\" selected value=\"off\">\n                                Off\n                            </option>\n                            <option id=\"vanilla_only\" value=\"vanilla_only\">\n                                Vanilla Only\n                            </option>\n                            <option id=\"half_vanilla\" value=\"half_vanilla\">\n                                Half-Vanilla\n                            </option>\n                            <option id=\"on\" value=\"on\">\n                                On\n                            </option>\n                        </select>\n                        <div style=\"padding: 5px;\">\n                            ";
output += runtime.suppressValue((lineno = 159, colno = 44, runtime.callWrap(t_5, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "vanilla_warps"),"warp_level_list","LEVEL SELECTOR","This will open a popup that will let you customize what levels' warps are in the pool. Any level not selected will have its vanilla warp locations.&#10;This defaults to All levels.",10,1])), env.opts.autoescape);
output += "\n                        ";
output += "\n                    </div>\n                </div>\n            </div>\n            <div class=\"flex-container\" style=\"margin-top: 20px;\">\n                ";
output += runtime.suppressValue((lineno = 165, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["wrinkly_location_rando","Random Wrinkly Door Locations","Wrinkly Door Locations are randomized within levels and their respective lobbies.",runtime.contextOrFrameLookup(context, frame, "False"),"Wrinkly Doors"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 166, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["tns_location_rando","Random Troff 'n' Scoff Portal Locations","T&S Portal Locations are randomized.",runtime.contextOrFrameLookup(context, frame, "False"),"Troff 'n' Scoff Portals"])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 167, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["vanilla_door_rando","Vanilla Door Shuffle","Wrinkly Doors and T&S Portals are only shuffled among the vanilla locations for one another. T&S Portals cannot appear in level lobbies."])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 168, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["dos_door_rando","Dos' Doors","Vanilla Door Shuffle with some restrictions:&#10;- One T&S per level&#10;- One hint door in each lobby&#10;- DK Portal Rando enabled"])), env.opts.autoescape);
output += "\n                <div class=\"item-select\">\n                    <p class=\"select-title\">DK Portals</p>\n                    <select name=\"dk_portal_location_rando_v2\"\n                            id=\"dk_portal_location_rando_v2\"\n                            display_name=\"Random DK Portal Locations\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"DK Portal Locations are randomized.\">\n                        <option id=\"off\" selected value=\"off\">\n                            Vanilla\n                        </option>\n                        <option id=\"main_only\" value=\"main_only\" title=\"Will only place portals in the main level maps of the 7 levels, and not any sub-areas\">\n                            Main Maps only\n                        </option>\n                        <option id=\"on\" value=\"on\" title=\"Can place portals in any level or sub-area\">\n                            On\n                        </option>\n                    </select>\n                </div>\n            </div>\n            <hr />\n            <h2 class=\"title\">BOSSES</h2>\n            <div class=\"flex-container\">\n                ";
output += runtime.suppressValue((lineno = 193, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["boss_location_rando","Shuffle Boss Location","The boss you can get in a level is different than normal."])), env.opts.autoescape);
output += "\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"K. Rool phases can be found in the T&S, and T&S bosses can be encountered as an endgame phase.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"krool_in_boss_pool\"\n                                id=\"krool_in_boss_pool\"\n                                display_name=\"Shuffle Boss Kong Required\"\n                                value=\"True\"/>\n                        K Rool Phases as Bosses\n                    </label>\n                </div>\n            </div>\n        </div>\n        <div class=\"col border panel\">\n            <h2 class=\"title\">ENEMIES</h2>\n            <div class=\"flex-container\">\n                ";
output += runtime.suppressValue((lineno = 211, colno = 41, runtime.callWrap(t_10, "dropdown_multiselector", context, [runtime.contextOrFrameLookup(context, frame, "enemies"),"enemies","Shuffled Enemies","This will open a popup that will let you customize what enemies appear in the game.&#10;This defaults to All options.",16,1])), env.opts.autoescape);
output += "\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Crown Enemies</p>\n                    <select name=\"crown_enemy_difficulty\"\n                            id=\"crown_enemy_difficulty\"\n                            display_name=\"Crown Enemy Randomizer\"\n                            class=\"form-select\"\n                            aria-label=\"Crown Enemy Randomizer\"\n                            data-toggle=\"tooltip\"\n                            title=\"Battle Crown Enemies are Randomized.&#10;-Vanilla: No crown enemy randomization will take place.&#10;-Easy: Crown enemies are randomized with a bias towards the easier enemies.&#10;-Medium: Crown enemies are randomized with a bias towards the medium-difficulty enemies.&#10;-Hard: Crown enemies are randomized with a bias towards the hardest enemies.&#10;-Progresive: The difficulty of crowns will scale up as you progress through the game.\">\n                        <option selected id=\"vanilla\" value=\"vanilla\">\n                            Vanilla\n                        </option>\n                        <option id=\"easy\" value=\"easy\">\n                            Easy\n                        </option>\n                        <option id=\"medium\" value=\"medium\">\n                            Medium\n                        </option>\n                        <option id=\"hard\" value=\"hard\">\n                            Hard\n                        </option>\n                        <option id=\"progressive\" value=\"progressive\">\n                            Progressive Difficulty\n                        </option>\n                    </select>\n                </div>\n                ";
output += runtime.suppressValue((lineno = 238, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["enemy_speed_rando","Random Enemy Speed","Enemy speeds are randomized."])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 239, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["randomize_enemy_sizes","Random Enemy Size","The size of enemies is randomized."])), env.opts.autoescape);
output += "\n            </div>\n            <hr />\n            <h2 class=\"title\">BONUS BARRELS</h2>\n            <div class=\"flex-container\">\n                ";
output += runtime.suppressValue((lineno = 244, colno = 41, runtime.callWrap(t_10, "dropdown_multiselector", context, [runtime.contextOrFrameLookup(context, frame, "minigames"),"minigames_list","Shuffled Bonus Barrels","This will open a dropdown that will let you customize what Bonus Games are in the pool.",18,1])), env.opts.autoescape);
output += "\n                <div class=\"spacer\"></div>\n                ";
output += runtime.suppressValue((lineno = 246, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["disable_hard_minigames","Disable Hard Minigames","Disables harder minigames."])), env.opts.autoescape);
output += "\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                        title=\"Bonus Barrels outside of Helm auto complete.\">\n                        <input class=\"form-check-input\"\n                        type=\"checkbox\"\n                        name=\"bonus_barrel_auto_complete\"\n                        id=\"bonus_barrel_auto_complete\"\n                        display_name=\"Auto Complete Bonus Barrels\"\n                        value=\"True\"/>\n                        Auto Complete Bonus Barrels\n                    </label>\n                </div>\n                ";
output += runtime.suppressValue((lineno = 259, colno = 31, runtime.callWrap(t_4, "toggle_input", context, ["alt_minecart_mayhem","Alternate Minecart Mayhem","Changes Minecart Mayhem to be a coin collection minigame instead of an endurance minigame."])), env.opts.autoescape);
output += "\n                <div class=\"spacer\"></div>\n            </div>\n            <hr />\n            <h2 class=\"title\">DIFFICULTY</h2>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Tag Barrels, Boss Fights, Candy Upgrades etc don't heal you like they normally would.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"no_healing\"\n                               display_name=\"No Heals\"\n                               value=\"True\"/>\n                        No Heals\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\" title=\"No melons are dropped from enemies.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"no_melons\"\n                               display_name=\"No Melon Slice Drops\"\n                               value=\"True\"/>\n                        No Melon Slice Drops\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"Ice Traps damage you.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"ice_traps_damage\"\n                               id=\"ice_traps_damage\"\n                               display_name=\"Ice Traps Damage Player\"\n                               value=\"True\"/>\n                        Ice Traps Damage Player\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                           title=\"The game is horizontally mirrored.\">\n                        <input class=\"form-check-input\"\n                               type=\"checkbox\"\n                               name=\"mirror_mode\"\n                               id=\"mirror_mode\"\n                               display_name=\"Mirror Mode\"\n                               value=\"True\"/>\n                        Mirror Mode\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                    title=\"When a kong dies you can no longer use the kong excluding for boss fights, you can enter any boss arena with any kong and it will force you to the required kong, if a kong is dead all moves will be granted.&#10;WARNING: Seeds might become unbeatable.\">\n                        <input class=\"form-check-input\"\n                            type=\"checkbox\"\n                            name=\"perma_death\"\n                            display_name=\"Irondonk\"\n                            value=\"True\"/>\n                        Irondonk\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                    title=\"Disables tag barrels from spawning.\">\n                        <input class=\"form-check-input\"\n                        type=\"checkbox\"\n                        name=\"disable_tag_barrels\"\n                        id=\"disable_tag_barrels\"\n                        display_name=\"Tag Barrels Disabled\"\n                        value=\"True\"/>\n                        Tag Barrels Disabled\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Donkey Kong 64 with a few twists:&#10;- Hideout Helm timer starts as soon as you load up a file.&#10;- Picking up a blueprint gives you 2 extra minutes on the clock. Each kong freed gives you 5 minutes. Every Golden Banana collected gives you 30 seconds.&#10;- As soon as the time runs out, saving is disabled on your file.&#10;Aim is to get the highest percentage you can before the clock runs out.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"helm_hurry\"\n                                id=\"helm_hurry\"\n                                display_name=\"Helm Hurry Mode\"\n                                value=\"True\"/>\n                        Helm Hurry Mode\n                    </label>\n                    ";
output += runtime.suppressValue((lineno = 344, colno = 42, runtime.callWrap(t_6, "properties_selector", context, [runtime.contextOrFrameLookup(context, frame, "helm_hurry_items"),"helmhurry_list","HELM HURRY SELECTOR","This will open a popup that will let you customize what how much time each item will give you."])), env.opts.autoescape);
output += "\n                ";
output += "\n                <div class=\"spacer\"></div>\n            </div>\n            <div class=\"flex-container\">\n                ";
output += runtime.suppressValue((lineno = 349, colno = 41, runtime.callWrap(t_10, "dropdown_multiselector", context, [runtime.contextOrFrameLookup(context, frame, "hard_mode"),"hard_mode","Hard Mode","This will open a dropdown that will let you customize what hard mode Options are active.",10])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 350, colno = 41, runtime.callWrap(t_10, "dropdown_multiselector", context, [runtime.contextOrFrameLookup(context, frame, "hard_bosses"),"hard_bosses","Hard Bosses","This will open a dropdown that will let you customize what bosses are made harder.",10])), env.opts.autoescape);
output += "\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Damage</p>\n                    <select name=\"damage_amount\"\n                            id=\"damage_amount\"\n                            display_name=\"Damage Multiplier\"\n                            class=\"form-select center-div\"\n                            aria-label=\"Damage Options\">\n                        <option selected value=\"default\">\n                            Normal\n                        </option>\n                        <option value=\"ohko\">\n                            OHKO\n                        </option>\n                        <option value=\"double\">\n                            Double Damage\n                        </option>\n                        <option value=\"quad\">\n                            Quad Damage\n                        </option>\n                    </select>\n                </div>\n                <div class=\"spacer\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n<script>\n    $(function() {\n        $('[data-toggle=\"tooltip\"]').tooltip()\n    });\n</script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})})});
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
output += "\n    </div>\n</div>\n<script>\n    $(function() {\n        $('[data-toggle=\"tooltip\"]').tooltip({\n            trigger: 'hover'\n        });\n    });\n    $(\"#plando_string_copy\").on('click', function (event) {\n        var input = $(\"#plando_string\");\n        input.select();\n        navigator.clipboard.writeText(input.val());\n    });\n</script>\n";
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
output += "\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div class=\"row\">\n        <div class=\"col border panel\">\n            <h2 class=\"title\">ENDGAME OPTIONS</h2>\n            <div class=\"flex-container\">\n                <!-- Logic -->\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("complex-options/logic-toggle.html", false, "progression.html", false, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
callback(null,t_6);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
callback(null,t_8);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n                <!-- Win Condition -->\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Win Condition</p>\n                    <div class=\"d-flex select-number-container\" id=\"win_condition_container\">\n                        <select name=\"win_condition_item\"\n                                id=\"win_condition_item\"\n                                display_name=\"Win Condition\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Win Condition\"\n                                data-toggle=\"tooltip\"\n                                title=\"Alter the condition required to show the credits.\">\n                            <option id=\"req_key\" value=\"req_key\">\n                                Keys\n                            </option>\n                            </option>\n                            <option id=\"get_key8\" value=\"get_key8\">\n                                Acquire Key 8\n                            </option>\n                            <option selected id=\"get_keys_3_and_8\" value=\"get_keys_3_and_8\" title=\"Acquire Keys 3 and 8 (Vanilla K. Rool Requirement)\">\n                                Acquire Keys 3 and 8\n                            </option>\n                            <option id=\"krem_kapture\" value=\"krem_kapture\" title=\"Photograph all enemies using the fairy camera\">\n                                Kremling Kapture\n                            </option>\n                            <option id=\"dk_rap_items\" value=\"dk_rap_items\" title=\"Acquire all items referenced in the DK Rap\">\n                                Complete the DK Rap\n                            </option>\n                            <option id=\"krools_challenge\" value=\"krools_challenge\" title=\"Beat K. Rool and collect all Keys, Blueprints, Bosses, and Bonus Barrels\">\n                                Krool's Challenge\n                            </option>\n                            <option id=\"kill_the_rabbit\" value=\"kill_the_rabbit\" title=\"Kill the rabbit in Chunky's igloo in Caves. Turn it to Ash. Simple as that.\">\n                                Kill the Rabbit\n                            </option>\n                            <option id=\"easy_random\" value=\"easy_random\">\n                                Random (Easy)\n                            </option>\n                            <option id=\"medium_random\" value=\"medium_random\">\n                                Random (Medium)\n                            </option>\n                            <option id=\"hard_random\" value=\"hard_random\">\n                                Random (Hard)\n                            </option>\n                            <option id=\"req_gb\" value=\"req_gb\">\n                                Golden Bananas\n                            </option>\n                            <option id=\"req_bp\" value=\"req_bp\">\n                                Blueprints\n                            </option>\n                            <option id=\"req_companycoins\" value=\"req_companycoins\">\n                                Company Coins\n                            </option>\n                            <option id=\"req_medal\" value=\"req_medal\">\n                                Medals\n                            </option>\n                            <option id=\"req_crown\" value=\"req_crown\">\n                                Crowns\n                            </option>\n                            <option id=\"req_fairy\" value=\"req_fairy\">\n                                Fairies\n                            </option>\n                            <option id=\"req_rainbowcoin\" value=\"req_rainbowcoin\">\n                                Rainbow Coins\n                            </option>\n                            <option id=\"req_bean\" value=\"req_bean\">\n                                Bean\n                            </option>\n                            <option id=\"req_pearl\" value=\"req_pearl\">\n                                Pearls\n                            </option>\n                            <option id=\"req_bosses\" value=\"req_bosses\">\n                                Bosses\n                            </option>\n                            <option id=\"req_bonuses\" value=\"req_bonuses\">\n                                Bonuses\n                            </option>\n                        </select>\n                        <input min=\"0\"\n                                max=\"255\"\n                                name=\"win_condition_count\"\n                                id=\"win_condition_count\"\n                                display_name=\"Win Condition Item Count\"\n                                class=\"form-control center-div\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Amount of the item specified to beat the game.\"\n                                default=\"1\"\n                                placeholder=\"1\"/>\n                    </div>\n                    <div class=\"form-check form-switch item-switch\" style=\"padding-left: 0;\">\n                        <label data-toggle=\"tooltip\"\n                                title=\"K. Rool's ship will not spawn until you meet your win condition requirements, and you must defeat K. Rool to win. Automatically enabled for Krool's Challenge. Automatically disabled for Kill the Rabbit.\">\n                            <input class=\"form-check-input\"\n                                    type=\"checkbox\"\n                                    name=\"win_condition_spawns_ship\"\n                                    id=\"win_condition_spawns_ship\"\n                                    display_name=\"Require Beating K. Rool\"\n                                    value=\"True\"/>\n                            Require Beating K. Rool\n                        </label>\n                    </div>\n                </div>\n            </div>\n            <hr />\n            <h5 class=\"select-title\">Number of Starting Keys\n                <label data-toggle=\"tooltip\"\n                        title=\"Selects a random amount of starting Keys.\">\n                    <input class=\"dice_checkbox\"\n                            type=\"checkbox\"\n                            name=\"keys_random\"\n                            id=\"keys_random\"\n                            display_name=\"Randomize Amount of Starting Keys\"\n                            onchange=\"toggle_clicks()\"\n                            value=\"True\"/>\n                    <label for=\"keys_random\"></label>\n                </label></h5>\n            <div class=\"flex-container\" style=\"justify-content: space-between; width: 90%; margin: auto;\">\n                <div style=\"display: flex;\">Start with Fewer Keys</div>\n                <div style=\"display: flex;\">Start with More Keys</div>\n            </div>\n            <div class=\"flex-container flex-center\">\n                ";
output += runtime.suppressValue((lineno = 128, colno = 31, runtime.callWrap(t_5, "slider_input", context, ["krool_key_count","Keys Pregiven to Access K. Rool",0,8])), env.opts.autoescape);
output += "\n            </div>\n            <div class=\"form-check form-switch item-switch center-flex\">\n                <label data-toggle=\"tooltip\" title=\"Select the keys you are guaranteed start with.\">\n                    <input class=\"form-check-input\"\n                            type=\"checkbox\"\n                            name=\"select_keys\"\n                            id=\"select_keys\"\n                            display_name=\"Guaranteed Starting Keys\"\n                            onchange=\"toggle_clicks()\"\n                            value=\"True\"/>\n                    Guaranteed Starting Keys\n                </label>\n                ";
output += runtime.suppressValue((lineno = 141, colno = 32, runtime.callWrap(t_4, "list_selector", context, [runtime.contextOrFrameLookup(context, frame, "keys"),"starting_keys_list","STARTING KEYS SELECTOR","This will open a popup that will let you customize what Keys you start with.&#10;This defaults to starting with no keys if none are selected.",8])), env.opts.autoescape);
output += "\n            ";
output += "\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Lock a key in Helm. The key will correspond to Helm's place in the level order. In non-complex Level order shuffle, this also forces Key 8 to be in the eighth level.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"key_8_helm\"\n                                id=\"key_8_helm\"\n                                display_name=\"Helm Key Lock\"\n                                value=\"True\"/>\n                        Helm Key Lock\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Make it required to get Key 8 or leave it up to chance.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"krool_access\"\n                                id=\"krool_access\"\n                                display_name=\"Don't Start with Key 8\"\n                                value=\"True\"\n                                title=\"Make it such that Key 8 cannot be one of the random starting Keys.\"/>\n                        Don't Start with Key 8\n                    </label>\n                </div>\n            </div>\n            <hr>\n            <h5 class=\"select-title\">Number of Starting Kongs\n                <label data-toggle=\"tooltip\"\n                        title=\"Selects a random value from Slider to determine how many kongs you start with.\">\n                    <input class=\"dice_checkbox\"\n                            type=\"checkbox\"\n                            name=\"starting_random\"\n                            id=\"starting_random\"\n                            display_name=\"Randomize number of starting Kongs\"\n                            onchange=\"toggle_clicks()\"\n                            value=\"True\"/>\n                    <label for=\"starting_random\"></label>\n                </label>\n            </h5>\n            ";
output += runtime.suppressValue((lineno = 184, colno = 27, runtime.callWrap(t_5, "slider_input", context, ["starting_kongs_count","Starting Kongs count",1,5])), env.opts.autoescape);
output += "\n            <div class=\"flex-container\" style=\"justify-content: center;\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Select Starting Kong</p>\n                    <select name=\"starting_kong\"\n                            id=\"starting_kong\"\n                            display_name=\"Selected Starting Kongs\"\n                            class=\"form-select center-div\"\n                            aria-label=\"Door 1 Requirements\"\n                            data-toggle=\"tooltip\"\n                            title=\"Specify your starting Kong. This kong will always be included in your starting set. Leave as Any to remain random.\">\n                        <option selected id=\"any\" value=\"any\">\n                            Any\n                        </option>\n                        <option id=\"donkey\" value=\"donkey\">\n                            Donkey\n                        </option>\n                        <option id=\"diddy\" value=\"diddy\">\n                            Diddy\n                        </option>\n                        <option id=\"lanky\" value=\"lanky\">\n                            Lanky\n                        </option>\n                        <option id=\"tiny\" value=\"tiny\">\n                            Tiny\n                        </option>\n                        <option id=\"chunky\" value=\"chunky\">\n                            Chunky\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n        <div class=\"col border panel\">\n            <h2 class=\"title\">HELM</h2>\n            <!-- Helm Length -->\n            <h5 class=\"select-title\">\n                Helm Length\n                <label data-toggle=\"tooltip\"\n                        title=\"Selects a random number of rooms that need to be completed in Hideout Helm.\">\n                    <input class=\"dice_checkbox\"\n                            type=\"checkbox\"\n                            name=\"helm_random\"\n                            onchange=\"toggle_clicks()\"\n                            id=\"helm_random\"\n                            display_name=\"Random Helm Length\"\n                            value=\"True\"/>\n                    <label for=\"helm_random\"></label>\n                </label>\n            </h5>\n            <div>\n                ";
output += runtime.suppressValue((lineno = 235, colno = 31, runtime.callWrap(t_5, "slider_input", context, ["helm_phase_count","Helm Length",1,5])), env.opts.autoescape);
output += "\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"The order of the Helm minigame rooms will randomly order the sequence.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"helm_phase_order_rando\"\n                                display_name=\"Shuffle Helm Rooms\"\n                                value=\"True\"/>\n                        Shuffle Helm Rooms\n                    </label>\n                </div>\n                <div class=\"spacer\"></div>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Helm Start Location</p>\n                    <select name=\"helm_setting\"\n                            id=\"helm_setting\"\n                            display_name=\"Helm Start Location\"\n                            class=\"form-select center-div\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"This option will shorten the time it takes to beat Hideout Helm.&#10;Skip Start adds the following changes:&#10;- You will spawn in the Blast o Matic room.&#10;- Opens the roman numeral doors to each Kong's room.&#10;- The gates in front of the music pads are gone.&#10;Skip All: Spawns you at the crown door.\">\n                        <option selected value=\"default\">\n                            Vanilla\n                        </option>\n                        <option value=\"skip_start\">\n                            Skip Start\n                        </option>\n                        <option value=\"skip_all\">\n                            Skip All\n                        </option>\n                    </select>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Helm Room Bonus Count</p>\n                    <select name=\"helm_room_bonus_count\"\n                            id=\"helm_room_bonus_count\"\n                            display_name=\"Helm Room Bonus Count\"\n                            class=\"form-select center-div\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Determines how many bonus barrels are required to beat a helm room. If set to zero, playing the instrument pad will complete a helm room.\">\n                        <option selected value=\"two\">\n                            Two\n                        </option>\n                        <option value=\"one\">\n                            One\n                        </option>\n                        <option value=\"zero\">\n                            Zero\n                        </option>\n                    </select>\n                </div>\n            </div>\n            <h5 class=\"select-title\">Helm Door Requirements</h5>\n            <div class=\"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Door 1 Requirements</p>\n                    <div class=\"d-flex select-number-container\" id=\"door_1_container\">\n                        <select name=\"crown_door_item\"\n                                id=\"crown_door_item\"\n                                display_name=\"Helm Door 1 Requirement Item\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Door 1 Requirements\"\n                                data-toggle=\"tooltip\"\n                                title=\"Changes the requirement to open the first door in Helm\">\n                            <option selected id=\"vanilla\" value=\"vanilla\" title=\"\">\n                                Vanilla (Crowns)\n                            </option>\n                            <option id=\"opened\" value=\"opened\">\n                                Opened\n                            </option>\n                            <option id=\"easy_random\" value=\"easy_random\">\n                                Random (Easy)\n                            </option>\n                            <option id=\"medium_random\" value=\"medium_random\">\n                                Random (Medium)\n                            </option>\n                            <option id=\"hard_random\" value=\"hard_random\">\n                                Random (Hard)\n                            </option>\n                            <option id=\"req_gb\" value=\"req_gb\">\n                                Golden Bananas\n                            </option>\n                            <option id=\"req_bp\" value=\"req_bp\">\n                                Blueprints\n                            </option>\n                            <option id=\"req_companycoins\" value=\"req_companycoins\">\n                                Company Coins\n                            </option>\n                            <option id=\"req_key\" value=\"req_key\">\n                                Keys\n                            </option>\n                            <option id=\"req_medal\" value=\"req_medal\">\n                                Medals\n                            </option>\n                            <option id=\"req_fairy\" value=\"req_fairy\">\n                                Fairies\n                            </option>\n                            <option id=\"req_rainbowcoin\" value=\"req_rainbowcoin\">\n                                Rainbow Coins\n                            </option>\n                            <option id=\"req_bean\" value=\"req_bean\">\n                                Bean\n                            </option>\n                            <option id=\"req_pearl\" value=\"req_pearl\">\n                                Pearls\n                            </option>\n                        </select>\n                        <input min=\"0\"\n                            max=\"255\"\n                            name=\"crown_door_item_count\"\n                            id=\"crown_door_item_count\"\n                            display_name=\"Helm Door 1 Requirement Count\"\n                            class=\"form-control center-div\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"Amount of the item specified to open the door.\"\n                            default=\"1\"\n                            placeholder=\"1\"/>\n                    </div>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Door 2 Requirements</p>\n                    <div class=\"d-flex select-number-container\" id=\"door_2_container\">\n                        <select name=\"coin_door_item\"\n                                id=\"coin_door_item\"\n                                display_name=\"Helm Door 2 Requirement Item\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Door 2 Requirements\"\n                                data-toggle=\"tooltip\"\n                                title=\"Changes the requirement to open the second door in Helm\">\n                            <option selected id=\"vanilla\" value=\"vanilla\" title=\"\">\n                                Vanilla (Company Coins)\n                            </option>\n                            <option id=\"opened\" value=\"opened\">\n                                Opened\n                            </option>\n                            <option id=\"easy_random\" value=\"easy_random\">\n                                Random (Easy)\n                            </option>\n                            <option id=\"medium_random\" value=\"medium_random\">\n                                Random (Medium)\n                            </option>\n                            <option id=\"hard_random\" value=\"hard_random\">\n                                Random (Hard)\n                            </option>\n                            <option id=\"req_gb\" value=\"req_gb\">\n                                Golden Bananas\n                            </option>\n                            <option id=\"req_bp\" value=\"req_bp\">\n                                Blueprints\n                            </option>\n                            <option id=\"req_key\" value=\"req_key\">\n                                Keys\n                            </option>\n                            <option id=\"req_medal\" value=\"req_medal\">\n                                Medals\n                            </option>\n                            <option id=\"req_crown\" value=\"req_crown\">\n                                Crowns\n                            </option>\n                            <option id=\"req_fairy\" value=\"req_fairy\">\n                                Fairies\n                            </option>\n                            <option id=\"req_rainbowcoin\" value=\"req_rainbowcoin\">\n                                Rainbow Coins\n                            </option>\n                            <option id=\"req_bean\" value=\"req_bean\">\n                                Bean\n                            </option>\n                            <option id=\"req_pearl\" value=\"req_pearl\">\n                                Pearls\n                            </option>\n                        </select>\n                        <input min=\"0\"\n                            max=\"255\"\n                            name=\"coin_door_item_count\"\n                            id=\"coin_door_item_count\"\n                            display_name=\"Helm Door 2 Requirement Count\"\n                            class=\"form-control center-div\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"Amount of the item specified to open the door.\"\n                            default=\"1\"\n                            placeholder=\"1\"/>\n                    </div>\n                </div>\n            </div>\n            <div id=\"krool_section\">\n                <hr />\n                <h2 class=\"title\">K. ROOL</h2>\n                <div class=\"flex-container\">\n                    <div class=\"form-check form-switch item-switch\">\n                        <label data-toggle=\"tooltip\"\n                                title=\"The order of KRools boxing match will randomly order the sequence.\">\n                            <input class=\"form-check-input\"\n                                    type=\"checkbox\"\n                                    name=\"krool_phase_order_rando\"\n                                    display_name=\"Shuffle K. Rool Phases\"\n                                    value=\"True\"/>\n                            Shuffle K. Rool Phases\n                        </label>\n                    </div>\n                    <div class=\"spacer\"></div>\n                </div>\n                <h5 class=\"select-title\">\n                    K. Rool Phase Length\n                    <label data-toggle=\"tooltip\"\n                            title=\"Selects a random number of K Rool Phases.\">\n                        <input class=\"dice_checkbox\"\n                                type=\"checkbox\"\n                                name=\"krool_random\"\n                                display_name=\"Random K. Rool Phase Count\"\n                                onchange=\"toggle_clicks()\"\n                                id=\"krool_random\"\n                                value=\"True\"/>\n                        <label for=\"krool_random\"></label>\n                    </label>\n                </h5>\n                <div>\n                    ";
output += runtime.suppressValue((lineno = 460, colno = 35, runtime.callWrap(t_5, "slider_input", context, ["krool_phase_count","K. Rool Phase Count",1,5])), env.opts.autoescape);
output += "\n                </div>\n                <div class=\"flex-container\">\n                    <div class=\"form-check form-switch item-switch center-flex\">\n                        <label data-toggle=\"tooltip\" title=\"All Cannon Barrels require Baboon Blast to use. This includes DK Phase of K Rool and the Helm DK Minigame.\">\n                            <input class=\"form-check-input\"\n                                    type=\"checkbox\"\n                                    name=\"cannons_require_blast\"\n                                    id=\"cannons_require_blast\"\n                                    display_name=\"DK Phase requires Baboon Blast\"\n                                    onchange=\"toggle_clicks()\"\n                                    value=\"True\"/>\n                            DK Phase requires blast\n                        </label>\n                    </div>\n                    <div class=\"item-select\">\n                        <p class=\"select-title\">Chunky Phase Slam Requirement</p>\n                        <select name=\"chunky_phase_slam_req\"\n                                id=\"chunky_phase_slam_req\"\n                                display_name=\"Chunky Phase Slam Requirement\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Chunky Phase Slam Requirement\"\n                                data-toggle=\"tooltip\"\n                                title=\"Set the level of slam required for Chunky Phase.\">\n                            <option id=\"green\" value=\"green\">\n                                Base Slam\n                            </option>\n                            <option selected id=\"blue\" value=\"blue\">\n                                Super Slam\n                            </option>\n                            <option id=\"red\" value=\"red\">\n                                Super Duper Slam\n                            </option>\n                            <option id=\"random\" value=\"random\">\n                                Random Slam\n                            </option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<script>\n    $('.nav-tabs').click(function() {\n        setTimeout(() => {\n            toggle_clicks()\n        }, 200);\n    });\n    \n    function toggle_clicks() {\n        if (document.getElementById(\"krool_random\").checked === true) {\n            $(\"#krool_phase_count\").prop(\"disabled\", true)\n        } else {\n            $(\"#krool_phase_count\").prop(\"disabled\", false)\n        }\n        if (document.getElementById(\"helm_random\").checked === true) {\n            $(\"#helm_phase_count\").prop(\"disabled\", true)\n        } else {\n            $(\"#helm_phase_count\").prop(\"disabled\", false)\n        }\n        if (document.getElementById(\"keys_random\").checked === true) {\n            $(\"#krool_key_count\").prop(\"disabled\", true)\n        } else {\n            $(\"#krool_key_count\").prop(\"disabled\", false)\n        }\n        if (document.getElementById(\"starting_random\").checked === true) {\n            $(\"#starting_kongs_count\").prop(\"disabled\", true)\n        } else {\n            $(\"#starting_kongs_count\").prop(\"disabled\", false)\n        }\n    }\n    $(function() {\n        $('[data-toggle=\"tooltip\"]').tooltip({\n            trigger: 'hover'\n        });\n    });\n</script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
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
if(Object.prototype.hasOwnProperty.call(t_1, "toggle_input")) {
var t_6 = t_1.toggle_input;
} else {
cb(new Error("cannot import 'toggle_input'")); return;
}
context.setVariable("toggle_input", t_6);
output += "\n";
env.getTemplate("dropdown_multiselector.html", false, "qualityoflife.html", false, function(t_8,t_7) {
if(t_8) { cb(t_8); return; }
t_7.getExported(function(t_9,t_7) {
if(t_9) { cb(t_9); return; }
if(Object.prototype.hasOwnProperty.call(t_7, "dropdown_multiselector")) {
var t_10 = t_7.dropdown_multiselector;
} else {
cb(new Error("cannot import 'dropdown_multiselector'")); return;
}
context.setVariable("dropdown_multiselector", t_10);
output += "\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div class=\"row\">\n        <div class=\"col border panel\">\n            <h2 class=\"title\">GAMEPLAY</h2>\n            <div class=\"flex-container\">\n                ";
output += runtime.suppressValue((lineno = 7, colno = 41, runtime.callWrap(t_10, "dropdown_multiselector", context, [runtime.contextOrFrameLookup(context, frame, "misc_changes"),"misc_changes","Misc Changes","This will open a popup that will let you customize what Quality of Life Options are active.&#10;This defaults to All options.",18,1])), env.opts.autoescape);
output += "\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Cutscene Skips</p>\n                    <select name=\"more_cutscene_skips\"\n                            id=\"more_cutscene_skips\"\n                            display_name=\"Cutscene Skips\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"More cutscenes will be skipped. Selecting 'Press Start to Skip' will skip those cutscenes by pressing Start. Selecting Automatic will skip those cutscenes automatically.\">\n                        <option value=\"off\">\n                            Off\n                        </option>\n                        <option value=\"press\">\n                            Press Start to Skip\n                        </option>\n                        <option value=\"auto\" selected>\n                            Automatic\n                        </option>\n                    </select>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"This option shortens all of the longer boss fights in the game.&#10;\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"shorten_boss\"\n                                id=\"shorten_boss\"\n                                display_name=\"Shorten Boss Fights\"\n                                value=\"True\"/>\n                        Shorten Boss Fights\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"This option will allow you to switch kongs almost anywhere using DPad left or DPad right.&#10;You will still need to unlock the kong in order to tag to them.&#10;You cannot switch kongs in rooms or areas that would otherwise break the puzzle.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"enable_tag_anywhere\"\n                                id=\"enable_tag_anywhere\"\n                                display_name=\"Enable Tag Anywhere\"\n                                value=\"True\"/>\n                        Tag Anywhere\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Will display the face of each Kong that has an item to purchase there or 'SOLD OUT' if all items are purchased.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"shop_indicator\"\n                                display_name=\"Shop Indicator\"\n                                value=\"True\"\n                                checked/>\n                        Shop Indicator\n                    </label>\n                </div>\n                \n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Warping to the DK isles is directly allowed from the pause menu.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"warp_to_isles\"\n                                display_name=\"Warp to Isles menu option\"\n                                value=\"True\"/>\n                        Warp to Isles menu option\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\" title=\"Speeds up the Bananaport animation.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"fast_warps\"\n                                display_name=\"Fast Warps\"\n                                value=\"True\"/>\n                        Fast Warps\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Automatically turns in keys once you collect them, removing the need to watch the K. Lumsy cutscenes to unlock levels.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"auto_keys\"\n                                display_name=\"Auto Key Turn Ins\"\n                                value=\"True\"/>\n                        Auto Key Turn ins\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\" hidden>\n                    <label data-toggle=\"tooltip\" title=\"Training Barrels complete, start with Simian Slam, spawn in DK Isles, Japes lobby entrance open.\">\n                        <input class=\"form-check-input\" \n                                type=\"checkbox\" \n                                name=\"fast_start_beginning_of_game_dummy\" \n                                id=\"fast_start_beginning_of_game_dummy\" \n                                display_name=\"Fast Start - Beginning of Game\" \n                                value=\"True\"/>\n                        Fast Start - Beginning of Game\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Numbers are displayed on the outside portal of a Troff 'n' Scoff with the amount of bananas still required.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"portal_numbers\"\n                                value=\"True\"\n                                display_name=\"Troff n Scoff Portal Numbers\"\n                                checked/>\n                        Troff n Scoff portal numbers\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Enables indicators for some checks:&#10;- Bonus Barrel Skin will match the reward you get for beating the bonus barrel.&#10;- The reward for completing a boss will be shown behind the boss door once you open it.&#10;- The reward for completing a battle crown will be shown in the background during a crown battle.&#10;- Text-based reward hints in various locations before completing a race or otherwise lengthy quest.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"item_reward_previews\"\n                                display_name=\"Item Reward Previews\"\n                                value=\"True\"\n                                checked/>\n                        Item Reward Previews\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Killing enemies in battle crown arenas will reduce the time remaining on a crown.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"enemy_kill_crown_timer\"\n                                display_name=\"Enemy Crown Timer Reduction\"\n                                value=\"True\"/>\n                        Enemy Crown Timer Reduction\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Disables some game patches designed for improved racing.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"disable_racing_patches\"\n                                display_name=\"Disable Racing Patches\"\n                                value=\"True\"/>\n                        Disable Racing Patches\n                    </label>\n                </div>\n                ";
output += runtime.suppressValue((lineno = 154, colno = 31, runtime.callWrap(t_6, "toggle_input", context, ["less_fragile_boulders","Less Fragile Boulders","Boulders, Kegs, Vases and the Apple will not destroy upon making contact with the ground",runtime.contextOrFrameLookup(context, frame, "True")])), env.opts.autoescape);
output += "\n                <div class=\"spacer\"></div>\n            </div>\n        </div>\n        <div class=\"col border panel\">\n            <h2 class=\"title\">HINTS</h2>\n            <a class=\"btn btn-secondary\" href=\"./wiki/All-About-Hints.html\" target=\"_blank\">\n                All About Hints\n                <img class=\"icon\" src=\"./static/img/external_link.png\">\n            </a>\n            <div class=\"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Hint Type</p>\n                    <select name=\"wrinkly_hints\"\n                            id=\"wrinkly_hints\"\n                            display_name=\"Wrinkly Hints\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Wrinkly hints are replaced with useful hints.&#10;Standard - The recommended default path-based hint experience, flexible across all settings..&#10;Cryptic - Same as default, with phrasing tweaks to be less direct.&#10;Item Hinting - A simpler hint system hinting as many items as possible, prioritizing Kongs, Keys, and required moves.&#10;Advanced Item Hinting - Same as above, but hints are less direct about what they lead you to.&#10;Off - Wrinkly doors have vanilla text.\">\n                        <option selected value=\"standard\">\n                            Standard\n                        </option>\n                        <option value=\"cryptic\">\n                            Cryptic\n                        </option>\n                        ";
output += "\n                        <option value=\"item_hinting\">\n                            Item Hinting\n                        </option>\n                        <option value=\"item_hinting_advanced\">\n                            Advanced Item Hinting\n                        </option>\n                        <option value=\"off\">\n                            Off\n                        </option>\n                    </select>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\" style=\"margin-bottom:5px;\">Progressive Hints</p>\n                    <div class=\"d-flex select-number-container\" id=\"progressive_hint_container\">\n                        <select name=\"progressive_hint_item\"\n                                id=\"progressive_hint_item\"\n                                display_name=\"Progressive Hint Item\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Progressive Hint Item\"\n                                data-toggle=\"tooltip\"\n                                title=\"The item required to obtain a hint through the progressive hint system, where hints are given on the pause menu for collecting x amount of a certain item rather than visiting Wrinkly..\">\n                            <option selected id=\"off\" value=\"off\" title=\"\">\n                                Off\n                            </option>\n                            <option id=\"req_gb\" value=\"req_gb\">\n                                Golden Bananas\n                            </option>\n                            <option id=\"req_bp\" value=\"req_bp\">\n                                Blueprints\n                            </option>\n                            <option id=\"req_key\" value=\"req_key\">\n                                Keys\n                            </option>\n                            <option id=\"req_medal\" value=\"req_medal\">\n                                Medals\n                            </option>\n                            <option id=\"req_crown\" value=\"req_crown\">\n                                Crowns\n                            </option>\n                            <option id=\"req_fairy\" value=\"req_fairy\">\n                                Fairies\n                            </option>\n                            <option id=\"req_rainbowcoin\" value=\"req_rainbowcoin\">\n                                Rainbow Coins\n                            </option>\n                            ";
output += "\n                            <option id=\"req_pearl\" value=\"req_pearl\">\n                                Pearls\n                            </option>\n                            <option id=\"req_cb\" value=\"req_cb\">\n                                Colored Bananas\n                            </option>\n                        </select>\n                        <input min=\"1\"\n                                max=\"3500\"\n                                name=\"progressive_hint_count\"\n                                id=\"progressive_hint_count\"\n                                display_name=\"Progressive Hint 35 Requirement\"\n                                class=\"form-control center-div\"\n                                type=\"number\"\n                                data-toggle=\"tooltip\"\n                                title=\"Item count requirement for the 35th hint with progressive Hints.\"\n                                default=\"1\"\n                                placeholder=\"1\"/>\n                    </div>\n                </div>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Hints are dimmed on the pause menu when a hint has been solved. Scouring and foolish hints will not dim.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"dim_solved_hints\"\n                                display_name=\"Dim Solved Hints\"\n                                value=\"True\"\n                                />\n                        Dim solved hints\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"No joke hints will be placed.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"serious_hints\"\n                                display_name=\"No Joke Hints\"\n                                value=\"True\"\n                                />\n                        No Joke Hints\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"Disables the check on Wrinkly Doors for having the appropriate kong unlocked.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"wrinkly_available\"\n                                display_name=\"Kongless Hint Doors\"\n                                value=\"True\"/>\n                        Kongless Hint Doors\n                    </label>\n                </div>\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"This option will add hints as to what move you are purchasing in shops.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"enable_shop_hints\"\n                                display_name=\"Enable Shop Hints\"\n                                value=\"True\"/>\n                        Enable Shop Hints\n                    </label>\n                </div>\n            </div>\n            <div class=\"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Spoiler Hints</p>\n                    <select name=\"spoiler_hints\"\n                            id=\"spoiler_hints\"\n                            display_name=\"Spoiler Hints\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Adds hints to the spoiler log that reveals specific information about the seed.&#10;Vials - Kongs, Keys, and vials will be revealed for each level. Shopkeeps appear as Kongs, and The Bean appears as a clear vial.&#10;Points - Each level has a number of points assigned to it based on the items the level contains. The point values for each item can be customized with the gear.\">\n                        <option value=\"vial_colors\">\n                            Vials\n                        </option>\n                        <option selected value=\"points\">\n                            Points\n                        </option>\n                        <option selected value=\"off\">\n                            Off\n                        </option>\n                    </select>\n                    <div>\n                    Customize Points\n                    ";
output += runtime.suppressValue((lineno = 322, colno = 42, runtime.callWrap(t_5, "properties_selector", context, [runtime.contextOrFrameLookup(context, frame, "points_spread"),"points_list","POINTS SPREAD","This will open a popup that will let you customize your points spread."])), env.opts.autoescape);
output += "\n                    ";
output += "\n                    <div class=\"form-check form-switch\" style=\"padding-top:10px;\">\n                        <label data-toggle=\"tooltip\"\n                                style=\"font-size:14px;\"\n                                title=\"Spoiler hints will includes the count of spoiler-hinted WotH (strictly required) items in each level.\">\n                            <input class=\"form-check-input\"\n                                    type=\"checkbox\"\n                                    name=\"spoiler_include_woth_count\"\n                                    display_name=\"Include WotH Counts in Spoiler Hints\"\n                                    value=\"True\"/>\n                            Include WotH Counts\n                        </label>\n                    </div>\n                    <div class=\"form-check form-switch\" style=\"padding-top:10px;\">\n                        <label data-toggle=\"tooltip\"\n                                style=\"font-size:14px;\"\n                                title=\"Spoiler hints will includes the level order.\">\n                            <input class=\"form-check-input\"\n                                    type=\"checkbox\"\n                                    name=\"spoiler_include_level_order\"\n                                    display_name=\"Include Level Order in Spoiler Hints\"\n                                    value=\"True\"/>\n                            Include Level Order\n                        </label>\n                    </div>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Extra Hints</p>\n                    <select name=\"microhints_enabled\"\n                            id=\"microhints_enabled\"\n                            display_name=\"Extra Hints\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Extra hints are placed in late-game to provide extra information if you are stuck on where an item is.&#10;- Monkeyport will be hinted upon touching the lower Monkeyport pad in Isles with the B. Locker requirements to enter all of the first 7 levels.&#10;- Gorilla Gone will be hinted upon touching the pad inside Helm Lobby with the B. Locker requirement to enter Helm.&#10;- Instruments will be hinted upon touching their pad in Helm.\">\n                        <option value=\"all\"\n                                title=\"Will hint all above items.\">\n                            All\n                        </option>\n                        <option selected value=\"base\" title=\"Will hint Monkeyport and Gorilla Gone, but not the Instruments.\">\n                            Some\n                        </option>\n                        <option value=\"off\">\n                            Off\n                        </option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n    <script>\n        $(function() {\n            $('[data-toggle=\"tooltip\"]').tooltip({\n                trigger: 'hover'\n            });\n        });\n        $(document).ready(function () {\n            if(!(document.getElementById(\"generate_seed\").hasAttribute(\"loading_settings\"))){\n                $(\"#generate_seed\").removeAttr(\"disabled\");\n            }\n        });\n    </script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["requirements.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("macros.html", false, "requirements.html", false, function(t_2,t_1) {
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
if(Object.prototype.hasOwnProperty.call(t_1, "item_req_selector")) {
var t_6 = t_1.item_req_selector;
} else {
cb(new Error("cannot import 'item_req_selector'")); return;
}
context.setVariable("item_req_selector", t_6);
output += "\n";
env.getTemplate("dropdown_multiselector.html", false, "requirements.html", false, function(t_8,t_7) {
if(t_8) { cb(t_8); return; }
t_7.getExported(function(t_9,t_7) {
if(t_9) { cb(t_9); return; }
if(Object.prototype.hasOwnProperty.call(t_7, "dropdown_multiselector")) {
var t_10 = t_7.dropdown_multiselector;
} else {
cb(new Error("cannot import 'dropdown_multiselector'")); return;
}
context.setVariable("dropdown_multiselector", t_10);
output += "\n\n<div class=\"container\" style=\"margin-top: 20px;\">\n    <div class=\"row\">\n        <div class=\"col border panel\">\n            <h2 class=\"title\">LEVEL ENTRY REQUIREMENTS</h2>\n            <div class=\"flex-container\">\n                <div class=\"item-select\">\n                    <p class=\"select-title\">B. Locker Option</p>\n                    <div class=\"d-flex select-number-container\" id=\"b_locker_number_container\">\n                        <select name=\"blocker_selection_behavior\"\n                                id=\"blocker_selection_behavior\"\n                                display_name=\"B. Locker Option\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Randomization type\"\n                                data-toggle=\"tooltip\"\n                                title=\"Determines how B. Locker requirements are determined.\">\n                            <option id=\"pre_selected\" value=\"pre_selected\" title=\"Manually-defined Golden Banana requirements for each individual B. Locker.\">\n                                Pre-Selected\n                            </option>\n                            <option id=\"easy_random\" value=\"easy_random\">\n                                Easy Random\n                            </option>\n                            <option id=\"normal_random\" selected value=\"normal_random\">\n                                Normal Random\n                            </option>\n                            <option id=\"hard_random\" value=\"hard_random\">\n                                Hard Random\n                            </option>\n                            <option id=\"chaos\" value=\"chaos\" title=\"B. Lockers will require items other than Golden Bananas to clear.\">\n                                Chaos B. Lockers\n                            </option>\n                        </select>\n                        <input min=\"0\"\n                            max=\"255\"\n                            name=\"blocker_text\"\n                            id=\"blocker_text\"\n                            display_name=\"B. Locker Count\"\n                            class=\"form-control center-div\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"Amount of the item specified to beat the game.\"\n                            default=\"1\"\n                            placeholder=\"1\"/>\n                        <div style=\"padding: 10px 5px\">\n                            <input class=\"customize\"\n                                type=\"button\"\n                                href=\"#\"\n                                id=\"blocker_customize\"\n                                data-bs-toggle=\"modal\"\n                                data-bs-target=\"#blocker_Modal\"\n                                data-toggle=\"tooltip\"\n                                title=\"Sets the pre-selected B. Locker Amounts\"/>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal fade\"\n                    id=\"blocker_Modal\"\n                    tabindex=\"-1\"\n                    aria-labelledby=\"blocker_ModalLabel\"\n                    aria-hidden=\"true\">\n                    <div class=\"modal-dialog\">\n                        <div class=\"modal-content\">\n                            <div class=\"modal-header\">\n                                <h3 class=\"modal-title title\" id=\"blocker_ModalLabel\">Define B. Locker Amounts</h3>\n                                <button type=\"button\"\n                                        class=\"btn-close\"\n                                        data-bs-dismiss=\"modal\"\n                                        aria-label=\"Close\"></button>\n                            </div>\n                            <div class=\"modal-body\">\n                                <div class=\"grid\">\n                                    ";
frame = frame.push();
var t_13 = (lineno = 73, colno = 53, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [8]));
if(t_13) {t_13 = runtime.fromIterator(t_13);
var t_12 = t_13.length;
for(var t_11=0; t_11 < t_13.length; t_11++) {
var t_14 = t_13[t_11];
frame.set("i", t_14);
frame.set("loop.index", t_11 + 1);
frame.set("loop.index0", t_11);
frame.set("loop.revindex", t_12 - t_11);
frame.set("loop.revindex0", t_12 - t_11 - 1);
frame.set("loop.first", t_11 === 0);
frame.set("loop.last", t_11 === t_12 - 1);
frame.set("loop.length", t_12);
output += "\n                                        <div class=\"g-col-3 g-col-md-3\">\n                                            <p class=\"select-title\">Level ";
output += runtime.suppressValue(t_14 + 1, env.opts.autoescape);
output += "</p>\n                                            <input class=\"form-control mx-auto text-center\"\n                                                min=\"0\"\n                                                max=\"200\"\n                                                name=\"blocker_";
output += runtime.suppressValue(t_14, env.opts.autoescape);
output += "\"\n                                                style=\"max-width: 50px\"\n                                                id=\"blocker_";
output += runtime.suppressValue(t_14, env.opts.autoescape);
output += "\"\n                                                value=\"";
output += runtime.suppressValue(t_14 + 1, env.opts.autoescape);
output += "\"\n                                                type=\"number\"\n                                                data-toggle=\"tooltip\"\n                                                title=\"You can adjust each individual B Locker amount to any number between 0-200.&#10;Note that if you make the game impossible to beat the glitchless, the program does validate if a game is beatable glitchless by adjusting your B Locker settings.&#10;If you are unsure what to adjust the level values to, use the presets dropdown instead.\"/>\n                                        </div>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                </div>\n                            </div>\n                            <div class=\"modal-footer\">\n                                <button type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">Close</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Troff 'n' Scoff Option</p>\n                    <div class=\"d-flex select-number-container\" id=\"troff_number_container\">\n                        <select name=\"tns_selection_behavior\"\n                                id=\"tns_selection_behavior\"\n                                display_name=\"Troff 'n' Scoff Option\"\n                                class=\"form-select center-div\"\n                                aria-label=\"Randomization type\"\n                                data-toggle=\"tooltip\"\n                                title=\"Determines how Troff 'n' Scoff requirements are determined.\">\n                            <option id=\"pre_selected\" value=\"pre_selected\" title=\"Manually-defined Colored Banana requirements for each individual Troff 'n' Scoff\">\n                                Pre-Selected\n                            </option>\n                            <option id=\"normal_random\" selected value=\"normal_random\">\n                                Normal Random\n                            </option>\n                            <option id=\"hard_random\" value=\"hard_random\">\n                                Hard Random\n                            </option>\n                        </select>\n                        <input min=\"0\"\n                            max=\"500\"\n                            name=\"troff_text\"\n                            id=\"troff_text\"\n                            display_name=\"Troff 'n' Scoff Count\"\n                            class=\"form-control center-div\"\n                            type=\"number\"\n                            data-toggle=\"tooltip\"\n                            title=\"The maximum number of Colored Bananas required to open a Troff 'n' Scoff.\"\n                            default=\"1\"\n                            placeholder=\"1\"/>\n                        <div style=\"padding: 10px 5px\">\n                            <input class=\"customize\"\n                                type=\"button\"\n                                href=\"#\"\n                                id=\"troff_customize\"\n                                data-bs-toggle=\"modal\"\n                                data-bs-target=\"#troff_Modal\"\n                                data-toggle=\"tooltip\"\n                                title=\"Sets the pre-selected Troff 'n' Scoff Amounts\"/>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal fade\"\n                    id=\"troff_Modal\"\n                    tabindex=\"-1\"\n                    aria-labelledby=\"troff_ModalLabel\"\n                    aria-hidden=\"true\">\n                    <div class=\"modal-dialog\">\n                        <div class=\"modal-content\">\n                            <div class=\"modal-header\">\n                                <h3 class=\"modal-title title\" id=\"troff_ModalLabel\">Define T&S Amounts</h3>\n                                <button type=\"button\"\n                                        class=\"btn-close\"\n                                        data-bs-dismiss=\"modal\"\n                                        aria-label=\"Close\"></button>\n                            </div>\n                            <div class=\"modal-body\">\n                                <div class=\"grid\">\n                                    ";
frame = frame.push();
var t_17 = (lineno = 155, colno = 53, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [8]));
if(t_17) {t_17 = runtime.fromIterator(t_17);
var t_16 = t_17.length;
for(var t_15=0; t_15 < t_17.length; t_15++) {
var t_18 = t_17[t_15];
frame.set("i", t_18);
frame.set("loop.index", t_15 + 1);
frame.set("loop.index0", t_15);
frame.set("loop.revindex", t_16 - t_15);
frame.set("loop.revindex0", t_16 - t_15 - 1);
frame.set("loop.first", t_15 === 0);
frame.set("loop.last", t_15 === t_16 - 1);
frame.set("loop.length", t_16);
output += "\n                                        <div class=\"g-col-3 g-col-md-3\">\n                                            <p class=\"select-title\">Level ";
output += runtime.suppressValue(t_18 + 1, env.opts.autoescape);
output += "</p>\n                                            <input class=\"form-control mx-auto text-center\"\n                                                min=\"0\"\n                                                max=\"200\"\n                                                name=\"troff_";
output += runtime.suppressValue(t_18, env.opts.autoescape);
output += "\"\n                                                style=\"max-width: 50px\"\n                                                id=\"troff_";
output += runtime.suppressValue(t_18, env.opts.autoescape);
output += "\"\n                                                value=\"";
output += runtime.suppressValue(t_18 + 1, env.opts.autoescape);
output += "\"\n                                                type=\"number\"\n                                                data-toggle=\"tooltip\"\n                                                title=\"You can adjust each individual Troff n Scoff amount to any number between 1-500.&#10;Note that if you make the game impossible to beat the glitchless, the program does validate if a game is beatable glitchless by adjusting your Troff n Scoff settings.&#10;If you are unsure what to adjust the level values to, use the presets dropdown instead.\"/>\n                                        </div>\n                                    ";
;
}
}
frame = frame.pop();
output += "\n                                </div>\n                            </div>\n                            <div class=\"modal-footer\">\n                                <button type=\"button\" class=\"btn btn-danger\" data-bs-dismiss=\"modal\">Close</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"flex-container\">\n                ";
output += runtime.suppressValue((lineno = 180, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["maximize_helm_blocker","Maximize Helm B. Locker","Ensures that Level 8's B. Locker will always be at the maximum value."])), env.opts.autoescape);
output += "\n                <div class=\"spacer\"></div>\n            </div>\n            <hr />\n            <h2 class=\"title\">ITEM REQUIREMENTS</h2>\n            <div class=\"flex-container\">\n                <!-- Medals for Jetpac-->\n                ";
output += runtime.suppressValue((lineno = 187, colno = 36, runtime.callWrap(t_6, "item_req_selector", context, ["medal_jetpac_behavior","medal_requirement","Medals for Jetpac",0,255,"Determines how Jetpac requirements are determined."])), env.opts.autoescape);
output += "\n                <!-- Pearls for Mermaid -->\n                ";
output += runtime.suppressValue((lineno = 189, colno = 36, runtime.callWrap(t_6, "item_req_selector", context, ["pearl_mermaid_behavior","mermaid_gb_pearls","Pearls for Mermaid",0,255,"Determines how Mermaid check requirements are determined."])), env.opts.autoescape);
output += "\n                <!-- Fairies for Queen -->\n                ";
output += runtime.suppressValue((lineno = 191, colno = 36, runtime.callWrap(t_6, "item_req_selector", context, ["fairy_queen_behavior","rareware_gb_fairies","Fairies for Fairy Queen",0,255,"Determines how Rareware GB check requirements are determined."])), env.opts.autoescape);
output += "\n                <!-- Medal CB Requirement -->\n                ";
output += runtime.suppressValue((lineno = 193, colno = 36, runtime.callWrap(t_6, "item_req_selector", context, ["cb_medal_behavior_new","medal_cb_req","Colored Bananas for a Medal",1,100,"Determines how Medal requirements are determined."])), env.opts.autoescape);
output += "\n            </div>\n        </div>\n        <div class=\"col border panel\">\n            <h2 class=\"title\">OVERWORLD REQUIREMENTS</h2>\n            <div class=\"flex-container\">\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                            title=\"All lobbies will be open as if the key to K. Lumsy was already turned in.&#10;This does not affect K. Rool's ship.\">\n                        <input class=\"form-check-input\"\n                                type=\"checkbox\"\n                                name=\"open_lobbies\"\n                                display_name=\"Open Lobbies\"\n                                value=\"True\"/>\n                        Open Lobbies\n                    </label>\n                </div>\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("complex-options/prog-slam-strength.html", false, "requirements.html", false, function(t_20,t_19) {
if(t_20) { cb(t_20); return; }
callback(null,t_19);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_22,t_21) {
if(t_22) { cb(t_22); return; }
callback(null,t_21);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n                ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("complex-options/switchsanity.html", false, "requirements.html", false, function(t_24,t_23) {
if(t_24) { cb(t_24); return; }
callback(null,t_23);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_26,t_25) {
if(t_26) { cb(t_26); return; }
callback(null,t_25);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n                <div class=\"form-check form-switch item-switch\">\n                    <label data-toggle=\"tooltip\"\n                        title=\"Reduces the number of items offered in shops to a maximum of 3.\"\n                        style=\"text-align: left\">\n                        <input class=\"form-check-input\"\n                            type=\"checkbox\"\n                            name=\"smaller_shops\"\n                            id=\"smaller_shops\"\n                            display_name=\"Smaller Shops\"\n                            value=\"True\"/>\n                        Smaller Shops\n                    </label>\n                </div>\n                ";
output += runtime.suppressValue((lineno = 225, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["shops_dont_cost","Tooie-Style Shops","Shops will not deduct coins from the player, but will require a certain amount of coins to purchase the item, akin to Banjo-Tooie's Jamjars silos."])), env.opts.autoescape);
output += "\n                ";
output += runtime.suppressValue((lineno = 226, colno = 31, runtime.callWrap(t_5, "toggle_input", context, ["free_trade_setting","Free Trade Agreement","Allow Kongs to pick up items assigned to other kongs."])), env.opts.autoescape);
output += "\n            </div>\n            <div class=\"flex-container\">\n                ";
output += runtime.suppressValue((lineno = 229, colno = 41, runtime.callWrap(t_10, "dropdown_multiselector", context, [runtime.contextOrFrameLookup(context, frame, "remove_barriers"),"remove_barriers","Remove Barriers","This will open a dropdown that will let you customize what barriers are removed.",12,1])), env.opts.autoescape);
output += "\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Galleon Water</p>\n                    <select name=\"galleon_water\"\n                            id=\"galleon_water\"\n                            display_name=\"Galleon Water\"\n                            class=\"form-select center-div\"\n                            aria-label=\"Galleon Water\"\n                            data-toggle=\"tooltip\"\n                            title=\"Alter the water level in Galleon.\">\n                        <option selected id=\"lowered\" value=\"lowered\">Lowered</option>\n                        <option id=\"raised\" value=\"raised\">Raised</option>\n                        <option id=\"random\" value=\"random\">Random</option>\n                    </select>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Fungi Time</p>\n                    <select name=\"fungi_time\"\n                            id=\"fungi_time\"\n                            class=\"form-select center-div\"\n                            aria-label=\"Fungi Time\"\n                            display_name=\"Fungi Time\"\n                            data-toggle=\"tooltip\"\n                            title=\"Alter the time of day in Fungi.\">\n                        <option selected id=\"day\" value=\"day\">Daytime Start</option>\n                        <option id=\"night\" value=\"night\">Nighttime Start</option>\n                        <option id=\"random\" value=\"random\">Random Start</option>\n                        <option id=\"dusk\" value=\"dusk\" title=\"All time-specific gates are removed.\">Dusk</option>\n                        <option id=\"progressive\" value=\"progressive\" title=\"Time of day progressively changes, with a full day-night cycle taking 5 minutes.\">Progressive</option>\n                    </select>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Random Shop Prices</p>\n                    <select name=\"random_prices\"\n                            id=\"random_prices\"\n                            display_name=\"Random Shop Prices\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"All prices in shops are randomized to a random number.&#10;-Vanilla: Same cost as base game.&#10;-Free: All moves are free.&#10;-Low: Moves cost 1-4 coins most of the time. (Avg: 2.5)&#10;-Medium: Moves cost 1-8 coins most of the time. (Avg: 4.5)&#10;-High: Moves cost 1-12 coins most of the time. (Avg: 6.5)&#10;-Extreme: Moves cost 10+ coins most of the time. (Avg: 11, starting Shockwave required!)&#10;WARNING: Extreme Prices is an enormous strain on coin logic and is VERY difficult to fill with. Only pick this if you're confident your settings give access to enough coins early.\">\n                        <option value=\"vanilla\">\n                            Vanilla\n                        </option>\n                        <option value=\"free\">\n                            Free\n                        </option>\n                        <option selected value=\"low\">\n                            Low\n                        </option>\n                        <option value=\"medium\">\n                            Medium\n                        </option>\n                        <option value=\"high\">\n                            High\n                        </option>\n                        <option id=\"extreme_price_option\" value=\"extreme\">\n                            Extreme\n                        </option>\n                    </select>\n                </div>\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Activate Bananaports</p>\n                    <select name=\"activate_all_bananaports\"\n                            id=\"activate_all_bananaports\"\n                            class=\"form-select\"\n                            aria-label=\"Activate Bananaports\"\n                            display_name=\"Activate Bananaports\"\n                            data-toggle=\"tooltip\"\n                            title=\"Determines which (if any) bananaports are activated by default.&#10;-Off: Bananaports are off by default.&#10;-Isles Only: Only the Bananaports in Isles are on by default.&#10;-All: All Bananaports are on by default.\">\n                        <option selected id=\"off\" value=\"off\">\n                            Off\n                        </option>\n                        <option id=\"isles\" value=\"isles\">\n                            Isles Only\n                        </option>\n                        <option id=\"isles_inc_helm_lobby\" value=\"isles_inc_helm_lobby\">\n                            Isles & Helm Lobby Only\n                        </option>\n                        <option id=\"all\" value=\"all\">\n                            All\n                        </option>\n                    </select>\n                </div>\n                ";
output += runtime.suppressValue((lineno = 312, colno = 41, runtime.callWrap(t_10, "dropdown_multiselector", context, [runtime.contextOrFrameLookup(context, frame, "faster_checks"),"faster_checks","Faster Checks","This will open a dropdown that will let you customize what checks are sped up.",12,1])), env.opts.autoescape);
output += "\n                <div class=\"item-select\">\n                    <p class=\"select-title\">Random Puzzle Solutions</p>\n                    <select name=\"puzzle_rando_difficulty\"\n                            id=\"puzzle_rando_difficulty\"\n                            display_name=\"Random Puzzle Solutions\"\n                            class=\"form-select\"\n                            aria-label=\"Randomization type\"\n                            data-toggle=\"tooltip\"\n                            title=\"Shuffles the solutions to various puzzles in the game.\">\n                        <option value=\"off\">\n                            Off\n                        </option>\n                        <option value=\"easy\">\n                            Easy\n                        </option>\n                        <option selected value=\"medium\">\n                            Medium\n                        </option>\n                        <option value=\"hard\">\n                            Hard\n                        </option>\n                        <option value=\"chaos\" title=\"Values picked can be any range between easy, medium and hard\">\n                            Chaos\n                        </option>\n                    </select>\n                </div>\n                <div class=\"spacer\"></div>\n            </div>\n        </div>\n    </div>\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})})})});
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
if(t_41 == "Wrinkly Hints") {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(env.getFilter("getHintText").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41)),t_46)), env.opts.autoescape);
output += "\n                                                                                <div style=\"font-size: 0.9em; color: #BBB\">\n                                                                                    ";
output += runtime.suppressValue(env.getFilter("getHintLocation").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41)),t_46)), env.opts.autoescape);
output += "\n                                                                                </div>\n                                                                            </td>\n                                                                        ";
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
if(t_41 == "Wrinkly Hints") {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(env.getFilter("getHintText").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41)),t_48)), env.opts.autoescape);
output += "\n                                                                                <div style=\"font-size: 0.9em; color: #BBB\">\n                                                                                    ";
output += runtime.suppressValue(env.getFilter("getHintLocation").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_41)),t_48)), env.opts.autoescape);
output += "\n                                                                                </div>\n                                                                            </td>\n                                                                        ";
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
if(t_50 == "Wrinkly Hints") {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(env.getFilter("getHintText").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50)),t_55)), env.opts.autoescape);
output += "\n                                                                                <div style=\"font-size: 0.9em; color: #BBB\">\n                                                                                    ";
output += runtime.suppressValue(env.getFilter("getHintLocation").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50)),t_55)), env.opts.autoescape);
output += "\n                                                                                </div>\n                                                                            </td>\n                                                                        ";
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
if(t_50 == "Wrinkly Hints") {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(env.getFilter("getHintText").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50)),t_57)), env.opts.autoescape);
output += "\n                                                                                <div style=\"font-size: 0.9em; color: #BBB\">\n                                                                                    ";
output += runtime.suppressValue(env.getFilter("getHintLocation").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_12)),t_50)),t_57)), env.opts.autoescape);
output += "\n                                                                                </div>\n                                                                            </td>\n                                                                        ";
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
if(t_99 == "Wrinkly Hints") {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(env.getFilter("getHintText").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99)),t_104)), env.opts.autoescape);
output += "\n                                                                                <div style=\"font-size: 0.9em; color: #BBB\">\n                                                                                    ";
output += runtime.suppressValue(env.getFilter("getHintLocation").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99)),t_104)), env.opts.autoescape);
output += "\n                                                                                </div>\n                                                                            </td>\n                                                                        ";
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
if(t_99 == "Wrinkly Hints") {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(env.getFilter("getHintText").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99)),t_106)), env.opts.autoescape);
output += "\n                                                                                <div style=\"font-size: 0.9em; color: #BBB\">\n                                                                                    ";
output += runtime.suppressValue(env.getFilter("getHintLocation").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_99)),t_106)), env.opts.autoescape);
output += "\n                                                                                </div>\n                                                                            </td>\n                                                                        ";
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
if(t_108 == "Wrinkly Hints") {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(env.getFilter("getHintText").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108)),t_113)), env.opts.autoescape);
output += "\n                                                                                <div style=\"font-size: 0.9em; color: #BBB\">\n                                                                                    ";
output += runtime.suppressValue(env.getFilter("getHintLocation").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108)),t_113)), env.opts.autoescape);
output += "\n                                                                                </div>\n                                                                            </td>\n                                                                        ";
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
if(t_108 == "Wrinkly Hints") {
output += "\n                                                                            <td>\n                                                                                ";
output += runtime.suppressValue(env.getFilter("getHintText").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108)),t_115)), env.opts.autoescape);
output += "\n                                                                                <div style=\"font-size: 0.9em; color: #BBB\">\n                                                                                    ";
output += runtime.suppressValue(env.getFilter("getHintLocation").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "spoiler")),t_70)),t_108)),t_115)), env.opts.autoescape);
output += "\n                                                                                </div>\n                                                                            </td>\n                                                                        ";
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

