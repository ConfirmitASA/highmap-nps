# HighMap NPS #
Creates a colored HighMap with data provided in your HTMLTable

## Usage ##
Requires 'jQuery' and 'highmaps.js'

```javascript
let map = new HighMapsNPS({
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
- `table`: HTML Table element where your data are stored
- `columnNames` 
	* `'name'` -required - column which data shows on every map element
	* `'value'` -required - column, with your main data, your map will be colored with 
	* `'...'` - other columns, you'd like to show on the map
- `dataClasses` - highChart.map option http://api.highcharts.com/highmaps/colorAxis.dataClasses
- `containerID`: HTMLElement your map will be rendered to
- `map` : path to javascript file with data about map from http://code.highcharts.com/mapdata/
- `options`: set of options for highChart.map, so you can add or change any option you want
