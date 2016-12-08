/**
* @table {HTMLTableElement} table - table element where the data is storage
* @param {} columnNames - array of column names of data table 
* @param {String} containerID - container for rendering map 
* @param {Array} dataClasses - set of colored groups for map
* @param {String} map - key for Higchart.maps
* @param {Object} options - options for HighMap chart
*
*/
class HighMapsNPS{
    constructor({table,columnNames=[],containerID, dataClasses = [{
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
              }], map,options}={}){
      let data = this.constructor.getData(table,columnNames);
      this.constructor.createMap(options, containerID, data, map, dataClasses,this.constructor.getHeaders(table,columnNames));
    }

    /**
    * Strips data from `table`
    * @param {HTMLTableElement} table - table element
    * @param {Array} columnNames - names of columns in resulting object
    * @returns {Array} returns set of objects 
    */
    static getData(table,columnNames){
      let headers = [];
      return [].slice.call(table.querySelectorAll('tbody>tr')).reduce((init,row,index)=>{ 
        init[index]= {};
        [].slice.call(row.children).forEach((td,i)=>{
          let val = td.textContent.trim();
          val = val === "DISTRICT OF COLUMBIA" ? "District of Columbia" : val.toLowerCase().split(" ").map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
          if(columnNames[i])init[index][columnNames[i]] = val.length!=0?isNaN(parseFloat(val))?val:parseFloat(val):null;
       });
        return init;
      },[]);
    }

    /**
    * Strips header from `table`
    * @param {HTMLTableElement} table - table element
    * @param {Array} columnNames - names of columns in resulting object
    * @returns {Array} returns object where <key> : <column name> info stored
    */
    static getHeaders(table,columnNames){
      let o = {};
      [].slice.call(table.querySelectorAll('thead>tr>td')).forEach((cell,index)=>{
          let val = cell.textContent.trim();
          if(columnNames[index])
            o[columnNames[index]] = val.length!=0?val:null;
      });
      return o;
    }
  /**
   * Copies props from a source object to a target object.
   *
   * Note, this method uses a simple `for...in` strategy for enumerating
   * properties.  To ensure only `ownProperties` are copied from source
   * to target and that accessor implementations are copied, use `extend`.
   *
   * @method mixin
   * @param {Object} target Target object to copy properties to.
   * @param {Object} source Source object to copy properties from.
   * @return {Object} Target object that was passed as first argument.
   */
  static mixin(target, source) {
    for (var i in source) {
      target[i] = source[i];
    }
    return target;
  }
    /**
    * Makes output for mapChart tooltip point format
    * @params {Array} headers - data to be added to tooltip
    * @returns {String} 
    */
    static composeOutput(headers){
      let a = ['<b>{point.name}</b>: {point.value}'];
        for (let key in headers){
        if (key !== "name" && key !== "value"){
          a.push(`<b>${headers[key]}</b>: {point.${key}}`);
        }
       }
      return a.join('<br>');
    }
    /**
    * Creates highmap
    * @param {Object} options - options for HighMap chart
    * @param {String} containerID - container for rendering map
    * @param {Object} data - input data for highmap
    * @param {String} map - key for Higchart.maps
    * @param {Array} dataClasses - set of colored groups for map
    * @param {Array} columnHeaders an array where <key>: column name and <value>:column header
    */
    static createMap(options, containerID, data, map, dataClasses,columnHeaders){
      let config = {
            chart: {
                borderWidth: 1
            },

            title: {
                text: ''
            },

            legend: {
                layout: 'horizontal',
                borderWidth: 0,
                backgroundColor: 'rgba(255,255,255,0.85)',
                floating: false,
                verticalAlign: 'bottom',
                y: 10
            },

            mapNavigation: {
                enabled: true
            },

            colorAxis: {
              dataClasses
            },

            series: [{
                data,
                mapData: Highcharts.maps[map],
                joinBy: ['name', 'name'],
                allAreas: false,
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    format: '{point.name}'
                },
                name: `<b>${columnHeaders.value}</b>`,
                tooltip: {
                    pointFormat: HighMapsNPS.composeOutput(columnHeaders)
                }
            }]
        }
      config = HighMapsNPS.mixin(config,options);
      Highcharts.mapChart(containerID, config);
    }
}
