<template>
  <div class="container user-sel-none">

    <div class="worldupdate top20">
        <div class="map"><img src="./assets/map.svg"></div>
        <ul>
            <li><label class="fyellow">Total Case</label> &nbsp &nbsp &nbsp{{worldupdate.total_cases}}</li>
            <li><label class="fpurple">New Case</label> &nbsp &nbsp &nbsp{{worldupdate.new_cases}}</li>
            <li><label class="fred">Total Deaths</label> &nbsp &nbsp &nbsp{{worldupdate.total_deaths}}</li>
            <li><label class="fred">New Deaths</label> &nbsp &nbsp &nbsp{{worldupdate.new_deaths}}</li>
            <li><label class="fgreen">Total Recovered</label> &nbsp &nbsp &nbsp{{worldupdate.total_recovered}}</li>
        </ul>
    </div>

    <div class="countrydata">
       <table class="table tb-green">
         <thead>
           <tr>
            <th>Name</th>
            <th>Case</th>
            <th>Active Case</th>
            <th>New Case</th>
            <th>Deaths</th>
            <th>New Deaths</th>
          </tr>
         </thead>
         <tr class="table-hover" v-for="stat in countriesStat" :key="stat['.key']">
           <td>{{stat.country_name}}</td>
           <td>{{stat.cases}}</td>
           <td>{{stat.active_cases}}</td>
           <td>{{stat.new_cases}}</td>
           <td>{{stat.deaths}}</td>
           <td>{{stat.new_deaths}}</td>
         </tr>
       </table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'world',
  data () {
    return {
      worldupdate: [],
      countriesStat: [],
      
      chartData:{
        'Death': '',
        'Recover': '',
        'Affected': '',
        'Active': '',
      }
    }
  },

  created(){

    //Fetching The Case by Country Data
      fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
              "x-rapidapi-key": "53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53"
          }
      })
      .then(response => response.json().then(data =>{
          //console.log(data)
          this.countriesStat = data.countries_stat;

      }))
      .catch(err => {
          console.log(err);
      });



    //Fetching the World Data
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53"
        }
    })
    .then(response => response.json().then( data => {
        this.worldupdate = data;
        console.log(this.worldupdate)

    })).catch(err => {
        console.log(err);
    });

  }
}
</script>

<style>
.container{
  width: 90%;
  margin: 0 auto;
}

body{
  background-color: rgb(250, 250, 250)
}

body::-webkit-scrollbar {
  display: none;
}

li{
  color: rgb(109, 109, 109);
}

.countrydata{
  background-color: #fff;
  margin-top: 15px;
  overflow: scroll;
  margin-bottom: 50px;
}

.countrydata::-webkit-scrollbar{
  display: none;
}

.header{
  height: 60px;
  display: flex;
  align-items: center;
  color: rgb(41, 179, 98);
}
.icon-size{
  font-size: 35px;
}
.map{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
}


li{
    height: 40px;
    background-color: #fff;
    border-radius: 5px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding-left: 20px;
}
@import url('asteroid-3.css');
</style>
