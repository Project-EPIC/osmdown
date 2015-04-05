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

###Example Build:
    osmdown preview ./test/sample.osmdown; open ./test/sample.osmdown.html


##Sample Document
An osm-down document starts with YAML frontmatter denoted by '---'

    ---
    title: My osmdown sample document
    email: 'sample_user@osmdown.io'

    #Analysis Window Information
    start_date: '2010-01-01'
    end_date:   '2010-12-31'

    bbox: '-86.354212,12.084238,-86.133199,12.191113' #Expecting 4 parameters

    baseurl: '../'
    ---

    #This is the title of my document
    The content in the codeblock below will be evaluated at build time and the variables are available throughout the rest of the document.

    ```
    //Code denoted by 3 ticks
    var options = {foo: bar}
    ```

    You can reference variables with curly braces: The value of foo in options is {{ options.foo }}

    A variety of pre-coded blocks exist:

    {{ osmviz.block('summary', {title: 'Boulder Sample'}) }}

    Specific data files can be loaded
    ```
    var data = osmdata('./test/json/median_changesets_per_mapper.json')
    ```

    {{ osmviz.block('changesets', {title: 'Boulder Sample'}) }}




##Prefabricated Blocks

####Summary Block
    {{osmviz.block('summary', options)}}


####Changeset Block
    {{osmviz.block('summary', options)}}
