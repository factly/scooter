export function mergeExtensions(extensions = []) {
  const mergedExtension = {
    extensionList: {},
    extensionUI: {},
  };

  extensions.forEach(ext => {
    if (ext && typeof ext === "object") {
      // Merge extensionList properties
      if (ext.extensionList && typeof ext.extensionList === "object") {
        mergedExtension.extensionList = {
          ...mergedExtension.extensionList,
          ...ext.extensionList,
        };
      }

      // Merge extensionUI properties
      if (ext.extensionUI && typeof ext.extensionUI === "object") {
        mergedExtension.extensionUI = {
          ...mergedExtension.extensionUI,
          ...ext.extensionUI,
        };
      }
    }
  });

  return mergedExtension;
}
