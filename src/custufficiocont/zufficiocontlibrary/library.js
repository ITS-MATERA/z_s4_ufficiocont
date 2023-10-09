/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library custZtipo.zTipoLibrary.
 */
sap.ui.define([
	"sap/ui/core/library"
], function () {
	"use strict";

	// delegate further initialization of this library to the Core
	// Hint: sap.ui.getCore() must still be used to support preload with sync bootstrap!
	sap.ui.getCore().initLibrary({
		name: "custufficiocont.zufficiocontlibrary",
		version: "${version}",
		dependencies: [ // keep in sync with the ui5.yaml and .library files
			"sap.ui.core"
		],
		types: [],
		interfaces: [],
		controls: [
			"custufficiocont.zufficiocontlibrary.controls.uffcontInput"			
		],
		elements: [],
		noLibraryCSS: false // if no CSS is provided, you can disable the library.css load here
	});
	
	/**
	 * Some description about <code>zTipoLibrary</code>
	 *
	 * @namespace
	 * @name custufficiocont.zufficiocontlibrary
	 * @author Innovates
	 * @version ${version}
	 * @public
	 */
	var thisLib = custufficiocont.zufficiocontlibrary;

	return thisLib;
});
