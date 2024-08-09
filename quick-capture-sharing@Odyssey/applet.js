const Applet = imports.ui.applet;
const GLib = imports.gi.GLib;
const Gettext = imports.gettext;
const Lang = imports.lang;
const UUID = "quick-capture-sharing@Odyssey";

Gettext.bindtextdomain(UUID, GLib.get_home_dir() + "/.local/share/locale");

function _(str) {
    return Gettext.dgettext(UUID, str);
}

function MyApplet(metadata, orientation, panelHeight, instanceId) {
    this._init(metadata, orientation, panelHeight, instanceId);
}

MyApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function(metadata, orientation, panelHeight, instanceId) {
        Applet.IconApplet.prototype._init.call(this, orientation, panelHeight, instanceId);

        try {
            this.set_applet_icon_symbolic_name("camera-photo");
            this.set_applet_tooltip(_("Click on the applet to make a screenshot and upload it"));
            this.actor.connect('button-release-event', Lang.bind(this, this._onIconClickEvent));
        }
        catch (e) {
            global.logError(e);
        }
    },

    _onIconClickEvent: function(actor, event) {
        if (this._applet_enabled) {
            try {
                const appletPath = imports.ui.appletManager.appletMeta[UUID].path;
                const scriptFile = `${appletPath}/kappalol`;
                GLib.spawn_command_line_async(scriptFile);
            }
            catch (e) {
                global.logError(e);            
            }
        }
        return true;
    }
};

function main(metadata, orientation, panelHeight, instanceId) {
    let myApplet = new MyApplet(metadata, orientation, panelHeight, instanceId);
    return myApplet;
}
