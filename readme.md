# HighMap NPS #
Creates a colored HighMap with data provided in your HTMLTable

## Usage ##
1. Add this libraries to your html page
```javascript
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="https://code.highcharts.com/maps/highmaps.js"></script>
<script src="path_to/highmap-nps.bundle.js"></script>
<script src="https://code.highcharts.com/mapdata/countries/us/custom/us-all-territories.js"></script>
```
The last one `<script src="https://code.highcharts.com/mapdata/countries/us/custom/us-all-territories.js"></script>`
actually the link to the map from HighMaps Map Collection.

So if u want to use any other map you should change last script `src`:
- Go to <http://code.highcharts.com/mapdata/>
- Choose any map you want in `javascript` format
- Paste path to the js file instead of last `script` `src`

For example: 

If u want to use Europe map instead your last `<script>` should look like  

`<script src="http://code.highcharts.com/mapdata/custom/europe.js"></script>`
2. Use map constructor in your script
```javascript
let map = new Reportal.HighMapsNPS({
	table: document.querySelector('tableid'),
 	columnNames: ['name', 'value', ...],
 	dataClasses: [{
                  from: 80,
                  to: 100,
                  color: '#8bc34a',
                  name: 'Promoter'
              },{
                  from: 60,
                  to: 80,
                  color: '#ffc107',
                  name: 'Passive'
              },{
                  from: 0,
                  to: 60,
                  color: '#f44336',
                  name: 'Detractor'
              }],
 	containerID:'mapContainer',
 	map : 'countries/us/custom/us-all-territories'
 	options: {}
 	})
```
- `table`: HTMLTable element where your data are stored
- `columnNames` 
	* `'name'` -required - row headers column which data shows on every map element
	
	You should always pass `name` as the first value in `columnNames` array
	* `'value'` -required - any column, which will be your primary source for data
	  
	If your primary data in column  number 3 you should passed it like 3rd argument
	like `columnNames: ['name','secondary data','value']`
	* `'...'` - any other columns, you'd like to show on the map tooltip
- `dataClasses` - highChart.map option <http://api.highcharts.com/highmaps/colorAxis.dataClasses>
- `containerID`: HTMLElement your map will be rendered to
- `map` : 
- `options`: set of options for highChart.map, so you can add or change any option you want

Example:
```javascript
options:{
    title:{
        text: 'Your Chart Title'
    }
}
```
