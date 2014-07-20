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
    secondaryMonitorID,
    found = true;

function init() {
    if (Main.layoutManager.primaryMonitor == Main.layoutManager.monitors[0]) {
        secondaryMonitorID = 1;
    } else {
        secondaryMonitorID = 0;
    }

    if (Main.layoutManager.monitors[secondaryMonitorID] == undefined) {
        found = false;
    }
}

function enable() {
    if (found) {
        originalPanelX = panelBox.x;
        originalPanelWidth = panelBox.width;
        movePanel();
        panelAllocationHandlerId = panelBox.connect('allocation-changed', movePanel);
    }
}

function disable() {
    panelBox.disconnect(panelAllocationHandlerId);
    moveToIndex(Main.layoutManager.primaryIndex);
}

function movePanel() {
    let index = (Main.layoutManager.primaryIndex + 1) % 2;
    moveToIndex(index);
}

function moveToIndex(index) {
    let monitor = Main.layoutManager.monitors[index];
    panelBox.set_position(monitor.x, monitor.y);
    panelBox.width = monitor.width;
}

