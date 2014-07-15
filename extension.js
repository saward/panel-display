//
// A gnome-shell extension that moves the panel to second display.
//

/*jshint esnext:true */
/*global imports, global */

const Main = imports.ui.main;

const panelBox = Main.layoutManager.panelBox;

let originalPanelX = panelBox.x,
    originalPanelWidth = panelBox.width,
    panelAllocationHandlerId,
    secondaryMonitorID;

function init() {
    if (Main.layoutManager.primaryMonitor == Main.layoutManager.monitors[0]) {
        secondaryMonitorID = 1;
    } else {
        secondaryMonitorID = 0;
    }
}

function enable() {
    originalPanelX = panelBox.x;
    originalPanelWidth = panelBox.width;
    movePanel();
    panelAllocationHandlerId = panelBox.connect('allocation-changed', movePanel);
}

function disable() {
    panelBox.x = originalPanelX;
    panelBox.width = originalPanelWidth;
    panelBox.disconnect(panelAllocationHandlerId);
}

function movePanel() {
    panelBox.x = Main.layoutManager.monitors[secondaryMonitorID].x;
    panelBox.width = Main.layoutManager.monitors[secondaryMonitorID].width;
}