OSMDOWN
=======
Open Street Map Markdown
------------------------
An OSM Markdown Parser for EPIC-OSM

##Command Line
    Usage: osmbuild [options] [command]

      Commands:

        parse    Simply parse a file, print back to STOUT
        render   Render a string of text
        build    Given an .osmdown file, write HTML

      Options:

        -h, --help                output usage information
        -V, --version             output the version number
        -d, --destination <path>  A destination for the rendered HTML

###Example:
    osmdown build ./test/sample.osmdown
