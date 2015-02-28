##Technical Notes

####Main Application Javascript File
[app.js](assets/js/app.js)
####Main Application CSS File
[app.css](assets/css/app.css)

**Most other .js files are plugins and dependencies.  Here is a list of application specific files that are usefull for configuration / add on:**

tableflavor.js

charttree.js

colortree.js

breaks.js

datatree.js



#####In detail:

**tableflavor.js**:  Each data theme (controlled by first control button in the top left of the screen -- not the LINK information button) queries one census table only.  When geographies are selected and the table is populated, the user has the option to look at the plain census table, or a 'table flavor' (default).  A table flavor is a more expressive view of the plain table.  For example, a plain census table may show raw numbers of population by race, whereas a table flavor may show the percentages of each race (with descriptive column headers).  The table flavor definitions are located in the **tableflavor.js** file.

**charttree.js**:  This will be similar in concept to Table Flavor, but is currently not defined.  The planned functionality will be to open up a data theme specific chart upon right clicking a geography.  This will give a chart related to an individual geography, rather than the selected feature chart tool, which shows a comparison between all selected features.

**colortree.js**:  This defines all of the color schemes used in the map.  It is based upon the widely known [Color Brewer](http://colorbrewer2.org/) specifications.  Colorschemes are divided into 3 main categories, sh (single-hue), mh (multi-hue), and ds (diverging scheme).  This is important as certain classification methods (like Jenks) should not be used with diverging schemes.

**datatree.js**:  Defines all of the data themes. "varcode": is a unique name identifying the theme, "verbose": Is a title that describes the theme, "section": defines what broad category the theme should be listed under, "table": is the census table that the theme is derived from, "numerator": defines the numerator of the theme,  "denominator": defines the denominator of the theme (necessary for data themes that are percent-of-total values),  "type": the data type of the theme, can be percent, regular (unformatted), number (for numeric),  "minval": the lowest possible value in the dataset, "mininc": the smallest significant value increment of the data,  "usezeroasnull": defines whether zero should be treated as a null value, "usenull": defines whether null values should be mapped, "skipbg": defines whether block group data is not available, "favtable": defines the table flavor, "favstyle": defines the default colorscheme of the data (classification scheme, number of classes, colorscheme).

**breaks.js**:  This was separated from datatree.js for clarity, but is really an additional attribute.  This defines the value breaks for every combination of geography and number of classes and classification scheme.  These are all precalculated for each theme.  In the future, this may be handled differently.  (Possibly, it will be calculated on demand and stored in a database).

***

###To Do

The code is in bad need of restructuring into a more logical ordering.  The first order of business will be to organize assigning default values vs values received in the query (address) string.

The second order of business will probably be to do away entirely with the breaks.js structure.  This will allow contributors to more easily add data themes.

The third order of business will be to take a serious look at how null and zero values are treated, and to possibly do away with everything associated with that aspect. (Again, allowing contributors to add data themes easily.)

The fourth order of business will probably be to start some sort of chart template structure (for charttree.js) similar to what was done for tableflavor.js.


###Stuff I'm really bad at

Most of my modals are very ugly.  I'm a terrible designer and welcome more organized layout.

The chart could stand to be much more responsive, fill up the modal better, and all around could use cosmetic improvements.  A download button would be nice as well.

Adding more data themes, table themes, chart themes, etc.










