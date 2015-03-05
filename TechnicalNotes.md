##Technical Notes

####Main Application Javascript File
[app.js](assets/js/app.js)
####Main Application CSS File
[app.css](assets/css/app.css)

**Most other .js files are plugins and dependencies.  Here is a list of application specific files that are usefull for configuration / add on:**

tableflavor.js

charttree.js

colortree.js

datatree.js



#####In detail:

**tableflavor.js**:  Each data theme (controlled by first control button in the top left of the screen -- not the LINK information button) queries one census table only.  When geographies are selected and the table is populated, the user has the option to look at the plain census table, or a 'table flavor' (default).  A table flavor is a more expressive view of the plain table.  For example, a plain census table may show raw numbers of population by race, whereas a table flavor may show the percentages of each race (with descriptive column headers).  The table flavor definitions are located in the **tableflavor.js** file.

**charttree.js**:  This will be similar in concept to Table Flavor, but is currently not defined.  The planned functionality will be to open up a data theme specific chart upon right clicking a geography.  This will give a chart related to an individual geography, rather than the selected feature chart tool, which shows a comparison between all selected features.

**colortree.js**:  This defines all of the color schemes used in the map.  It is based upon the widely known [Color Brewer](http://colorbrewer2.org/) specifications.  Colorschemes are divided into 3 main categories, sh (single-hue), mh (multi-hue), and ds (diverging scheme).  This is important as certain classification methods (like Jenks) should not be used with diverging schemes.

**datatree.js**:  Defines all of the data themes. 

"varcode": is a unique name identifying the theme, 

"verbose": Is a title that describes the theme, 

"section": defines what broad category the theme should be listed under, 

"table": is the census table that the theme is derived from, 

"numerator": defines the numerator of the theme,  

"denominator": defines the denominator of the theme (necessary for data themes that are percent-of-total values),  

"type": the data type of the theme, can be percent, regular (unformatted), number (for numeric),  

"minval": the lowest possible value in the dataset, 

"mininc": the smallest significant value increment of the data,  

"usezeroasnull": defines whether zero should be treated as a null value.  Necessary because of the numerator/denominator setup.  Ex: Median Household Income is num/den = b19013001/1.  In this case there is never a null value.  On themes where the denominator is 1, a null value for the numerator equates to 0. null / 1 = 0; In these cases we can assume 0=null, and set the usezeroasnull flag accordingly.  However, we can't blindly set this to yes.  Consider the case where we're looking at the theme 'Percent Hawaiian & Pacific Islander'.  This theme has a non-zero denominator (total population), but often a zero for the numerator.  In this case, a 0 is most certainly not a null value, it just means 0%, or no Hawaiian & Pacific Islander population.  Luckily, where the denominator is 0 (no population at all in tract), the equation will result in null, so null still works correctly in this situation.

"favtable": defines the table flavor,  (in the future a default will be set at the raw table, and defining this will be optional)

"favstyle": defines the default colorscheme of the data (classification scheme, number of classes, colorscheme). (in the future a default will be set and defining this will be optional)

####Tools:

**createjson.html** will provide an easy interface to create data themes

***

###To Do

The code is in bad need of restructuring into a more logical ordering.  The first order of business will be to organize assigning default values vs values received in the query (address) string.

The second order of business will probably be to start some sort of chart template structure (for charttree.js) similar to what was done for tableflavor.js.


###Stuff I'm really bad at

Most of my modals are very ugly.  I'm a terrible designer and welcome more organized layout.

The chart could stand to be much more responsive, fill up the modal better, and all around could use cosmetic improvements.  A download button would be nice as well.

Adding more data themes, table themes, chart themes, etc.










