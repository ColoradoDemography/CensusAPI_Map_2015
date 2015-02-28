##Technical Notes

####Main Application Javascript File
[app.js](assets/js/app.js)
####Main Application CSS File
[app.css](assets/js/app.css)

#####Most other .js files are plugins and dependencies.  Here is a list of application specific files that are usefull for configuration / add on:
tableflavor.js
charttree.js
colortree.js
breaks.js
datatree.js


######In detail:

**tableflavor.js**:  Each data theme (controlled by first control button in the top left of the screen -- not the LINK information button) queries one census table only.  When geographies are selected and the table is populated, the user has the option to look at the plain census table, or a 'table flavor' (default).  A table flavor is a more expressive view of the plain table.  For example, a plain census table may show raw numbers of population by race, whereas a table flavor may show the percentages of each race (with descriptive column headers).  The table flavor definitions are located in the **tableflavor.js** file.

**charttree.js**:  This will be similar in concept to Table Flavor, but is currently not defined.  The planned functionality will be to open up a data theme specific chart upon right clicking a geography.  This will give a chart related to an individual geography, rather than the selected feature chart tool, which shows a comparison between all selected features.

**colortree.js**:  This defines all of the color schemes used in the map.  It is based upon the widely known Color Brewer specifications.







