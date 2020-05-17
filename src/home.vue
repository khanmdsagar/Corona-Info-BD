<template>
<div class="container user-sel-none">
    <div class="header">
    <div class="icons">
        <router-link id="public" to="/world" class="fgreen material-icons icon-size">public</router-link>
    </div>
    </div>
       <div class="updatedate" v-for="up in update" v-bind:key="up['.key']">
         <p id="countryname">Country : {{up.country_name}}</p>
         <p id="updatedate" class="top5">Updated at : {{up.record_date_pure}}</p>
       </div>

      <div class="peopleContainer" v-for="up in update" v-bind:key="up['.key']" >
        <div class="subPeopleContainer">
          <div class="peopleBox">
            <div class="caseName totalcase">Total Case</div>
            <div class="caseNmber totalcase">{{up.total_cases}}</div>
            <p class='ppl'>People</p>
          </div>
        </div>

         <div class="subPeopleContainer">
          <div class="peopleBox">
            <div class="caseName newcase">New Case</div>
            <div class="caseNmber newcase">{{up.new_cases}}</div>
            <p class='ppl'>People</p>
          </div>
        </div>

         <div class="subPeopleContainer">
          <div class="peopleBox">
            <div class="caseName activecase">Active Case</div>
            <div class="caseNmber activecase">{{up.active_cases}}</div>
            <p class='ppl'>People</p>
          </div>
        </div>

         <div class="subPeopleContainer">
          <div class="peopleBox">
            <div class="caseName totaldeaths">Total Deaths</div>
            <div class="caseNmber totaldeaths">{{up.total_deaths}}</div>
            <p class='ppl'>People</p>
          </div>
        </div>

         <div class="subPeopleContainer">
          <div class="peopleBox">
            <div class="caseName newdeaths">New Deaths</div>
            <div class="caseNmber newdeaths">{{up.new_deaths}}</div>
            <p class='ppl'>People</p>
          </div>
        </div>

         <div class="subPeopleContainer">
          <div class="peopleBox">
            <div class="caseName totalrecovered">Total Recovered</div>
            <div class="caseNmber totalrecovered">{{up.total_recovered}}</div>
            <p class='ppl'>People</p>
          </div>
        </div>

         <div class="subPeopleContainer">
          <div class="peopleBox">
            <div class="caseName totaltests">Total tests</div>
            <div class="caseNmber totaltests">{{up.total_tests}}</div>
            <p class='ppl'>People</p>
          </div>
        </div>

        <div class="subPeopleContainer">
          <div class="peopleBox">
            <div class="caseName caseperminute">Case perMinute</div>
            <div class="caseNmber caseperminute">{{up.total_cases_per1m}}</div>
            <p class='ppl'>People</p>
          </div>
        </div>
      </div>

      <!--Chart : npm i vue-chartkick chart.js -->
      <div class="chart top20">
         <div class="chartView">
           <pie-chart :donut="true" suffix="%" :colors="['#ff3d3d', '#2ECC71','#FFC300','#5AB9EA']" :data = "chartData"></pie-chart>
         </div>
      </div>

      <div class="tips top20 bottom20">
        <div class="nurse">
           <p style="font-size: 18px; font-weight: bold; color: #fff; line-height: 25px; position:absolute; top: 35px ; right: 5%;">Call 16263 for <br>Medical Help</p>
          <img src="./assets/nurse.svg">
        </div>
      </div>

      <div class="developer bottom20">
          Developed by : <a href="https://facebook.com/profile.php?id=100041102121298">&nbspKhan Md Sagar</a>
       </div>
</div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      update: [],
      country: 'Bangladesh',
      
      chartData:{
        'Death': '',
        'Recover': '',
        'Affected': '',
        'Active': '',
      }
    }
  },

  created(){

      //Fetching the World Data
      fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country="+ this.country, {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
              "x-rapidapi-key": "53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53"
          }
      })
      .then(response => response.json().then( data => {
          this.update = data.latest_stat_by_country

            this.update.forEach(element => {
              
             var activecase =  element.active_cases
             var totalcase =  element.total_cases 
             var totaldeaths =  element.total_deaths
             var totalrecovered =  element.total_recovered
             var totaltests =  element.total_tests

             var newactivecase = activecase.replace(/,/g, '')
             var newtotalcase = totalcase.replace(/,/g, '')
             var newtotaldeaths = totaldeaths.replace(/,/g, '')
             var newtotalrecovered = totalrecovered.replace(/,/g, '')
             var newtotaltests = totaltests.replace(/,/g, '')

             this.chartData.Death =  parseFloat(newtotaldeaths / newtotalcase * 100).toFixed(2)
             this.chartData.Recover = parseFloat(newtotalrecovered / newtotalcase * 100).toFixed(2) 
             this.chartData.Affected = parseFloat(newtotalcase / newtotaltests * 100).toFixed(2) 
             this.chartData.Active = parseFloat(newactivecase / newtotalcase * 100).toFixed(2) 

           
    });
          
      })).catch(err => {
          console.log(err);
      });

  }
}
</script>

<style>

.developer{
  display: flex;
  align-items: center;
  justify-content: center;
}

#countryname{
    color: #2ECC71;
}
#updatedate{
    color: #2ECC71;
}
#public{
  cursor: pointer;
}

.icons{
  width: 100%;
}

p{
  color: rgb(109, 109, 109);
}
.nurse{
  background-image: linear-gradient(rgb(116, 206, 176), rgb(0, 124, 93));
  border-radius: 20px;
  margin: 7px;
  height: 143px;
  overflow: hidden;
  position: relative;
}
.updatedate{
  margin: 6px;
}
.ppl{
  margin-top: 7px;
}
.subPeopleContainer{
  margin: 6px;
}
.peopleContainer{
  display: grid;
  grid-template-columns: auto auto;
}
.peopleBox{
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
}
.container{
  width: 90%;
  margin: 0 auto;
}
.caseNmber{
  font-weight: bold;
  font-size: 27px;
  margin-top: 12px;
}
.header{
  height: 70px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  color: rgb(41, 179, 98);
}
.icon-size{
  font-size: 35px;
}

body{
  background-color: rgb(250, 250, 250)
}
.svgpart{
  width: 80%;
}
.date{
  width: 200px;
  height: 20px;
  overflow: hidden;
}
.datapart{
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.totalcase{
  color: #FFC300;
}
.newcase{
  color: #8860D0;
}
.activecase{
  color: #5AB9EA;
}
.totaldeaths {
  color: #ff3d3d;
}
.newdeaths{
  color: #ff3d3d;
}
.totalrecovered {
  color: #2ECC71;
}
.totaltests{
  color: #2ECC71;
}
.caseperminute{
color: #ff3d3d;
}


.totalcase svg{
  fill: #FFC300;
}
.newcase svg{
  fill: #8860D0;
}
.activecase svg{
  fill:  #5AB9EA;
}

.totaldeaths svg{
  fill: #ff3d3d;
}
.newdeaths svg{
  fill: #ff3d3d;
}
.totalrecoverd svg{
  fill: #2ECC71;
}


@import url('asteroid-3.css');
</style>
