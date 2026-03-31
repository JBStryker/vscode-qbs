# Qbs: Build configurations and overridden properties

Qbs support the following set of default build
[configuration names](https://doc.qt.io/qbs/cli-build.html#config-configuration-op-op-name)
`release`, `debug`, `profiling`.

Also the user can create its own custom build configuration
names with the specific set of an overridden properties.

Qbs allows to override any project properties on the
resolving stage. Details about the data format for this
can be found in the official Qbs
[documentation](https://doc.qt.io/qbs/language-introduction.html#overriding-property-values-from-the-command-line).

Although, this extension allows you to do this using
a special `qbs-configurations.json` file.

A data format in this file corresponds to the official
Qbs documentation, the link to which is given above.

Until a `qbs-configurations.json` file is found on disk, the extension
uses the same default build configurations **in memory** (it does not
create the file automatically). To extend or replace them add the file 
(see below). When the file is present and changed, the Qbs
extension will automatically start resolving the active Qbs project
with the new configurations and properties set in the file.

## Create build configurations

Call the **Qbs: Edit Build Configurations** command from the command
palette. This is the only built-in action that **creates** the default
`qbs-configurations.json` when it does not exist yet; it then opens the
file in the editor.

To reload from disk after edits (or if you created the file outside the
editor), run **Qbs: Scan Build Configurations**.

By default the file lives under the current project workspace folder at
`<path/to/your/project/.vscode/qbs-configurations.json>` (see
`qbs.buildConfigurationsFilePath` if you use a custom location).

The default contents of this configuration file looks
like this:

```json
{
    "version": "1",
    "configurations": [
        {
            "name": "release",
            "displayName": "Release",
            "description": "Build with optimizations.",
            "properties": {
                "qbs.buildVariant": "release"
            }
        },
        {
            "name": "debug",
            "displayName": "Debug",
            "description": "Build with debug information.",
            "properties": {
                "qbs.buildVariant": "debug"
            }
        },
        {
            "name": "profiling",
            "displayName": "Profiling",
            "description": "Build with optimizations and debug information.",
            "properties": {
                "qbs.buildVariant": "profiling"
            }
        }
    ],
    "properties": {
        "foo": "foo-value",
        "bar": "bar-value",
    }
}
```

The user can edit, remove, or add the other configurations.

## Specify overriden properties

It is possible to specify a list of specific properties passed
to the Qbs at resolve step for each build configuration
separatelly using the `properties` item.

For example, the possible configuration might look like this:

```json
{
    "name": "my-cool-config",
    "displayName": "My Cool Config",
    "description": "Enable something and override something.",
    "properties": {
        "projects.someProject.projectProperty": false,
        "products.someProduct.productProperty": false,
        "modules.cpp.treatWarningsAsErrors": true,
        "products.someProduct.cpp.treatWarningsAsErrors": true,
        "projects.someProject.listProp: ["a", "b", "c"]
    }
}
```

## Specify common properties

It is possible to specify a list of common properties passed
to the Qbs at resolve step for each build configuration.

```json
{
    "properties": {
        "foo": "foo-value",
        "bar": "bar-value"
    }
}
```

E.g. this makes sense if some of overriden properties from
build configuration are same (e.g. have duplicates):

```json
{
    "configurations": [
        {
            "name": "release",
            "properties": {
                "my-prop": "my-value"
            }
        },
        {
            "name": "debug",
            "properties": {
                "my-prop": "my-value"
            }
        }
    ]
}
```

then it can be re-written with:

```json
{
    "configurations": [
        {
            "name": "release",
        },
        {
            "name": "debug",
        }
    ],
    "properties": {
        "my-prop": "my-value"
    }
}
```

**Note**: If a common property matches with a specific property,
then the specific property value passed to the resolve step
(i.e. overrides a common property).
