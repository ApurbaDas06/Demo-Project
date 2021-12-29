import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';


@Component({
  selector: 'app-multi-series-line-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './multi-series.component.html',
  styleUrls: ['./multi-series.component.css']
})
export class MultiSeriesComponent implements OnInit {

  @Input() public dataE: Array<any>;

  data: any;

  svg: any;
  margin = {top: 20, right: 80, bottom: 30, left: 50};
  g: any;
  width: number;
  height: number;
  x: any;
  y: any;
  z: any;
  line: any;
  list: any;
  list2: any;

  constructor() {
  }

  ngOnInit() {

    this.list = this.dataE.map(function (user) {

      return {

        date: new Date(Date.parse(user.timeEntry)),
        sensorData: user.flowRate

      };
    });

    this.list = {id: "flow ", values: this.list};

    this.list2 = this.dataE.map(function (user) {

      return {

        date: new Date(Date.parse(user.timeEntry)),
        sensorData: user.pressure

      };
    });

    this.list2 = {id: "pressure ", values: this.list2};

    var temp_s = [
      {
        id: this.list.id,
        values: this.list.values
      },
      {
        id: this.list2.id,
        values: this.list2.values
      }
    ];
    this.list = temp_s;
    this.data = this.list.map((v: any) =>
      v.values.map((w: any) =>
        w.date))[0];
    this.initChart();
    this.drawAxis();
    this.drawPath();
  }

  private initChart(): void {
    this.svg = d3.select("#svgcontainer");

    this.width = this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = this.svg.attr('height') - this.margin.top - this.margin.bottom;

    this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.z = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);


    this.line = d3Shape.line()
      .curve(d3Shape.curveBasis)
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.sensorData));

    this.x.domain(d3Array.extent(this.data, (d: Date) => d));
    const s = d3Array.min(this.list, function (c: any) {
      return d3Array.min(Object.entries(c.values), function (d: any) {
        return d[1].sensorData;
      });
    });

    this.y.domain([
      d3Array.min(this.list, function (c: any) {
        return d3Array.min(Object.entries(c.values), function (d: any) {
          return d[1].sensorData;
        });
      }),
      d3Array.max(this.list, function (c: any) {
        return d3Array.max(Object.entries(c.values), function (d: any) {
          return d[1].sensorData;
        });
      })
    ]);

    this.z.domain(this.list.map(function (c: any) {
      return c.id;
    }));
  }

  private drawAxis(): void {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x))
      .append('text')
      .text('Time-Stamp')
      .attr('fill', '#000')
      .attr("text-anchor", "start")
      .attr("x", 750)
      .attr("y", -2)
      .attr('dx', '0.71em');


    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('fill', '#000')
      .text('Flow, Pressure, º(G/sec) ,  (Pascal)');

    this.g.selectAll('text')
      .style('font-size', '15px')
      .style('font-family', 'Lucida Console')
      .style('font-weight', 'lighter');
  }

  private drawPath(): void {
    let sensorin = this.g.selectAll('.sensorin')
      .data(this.list)
      .enter().append('g')
      .attr('class', 'sensor');

    sensorin.append('path')
      .attr('class', 'line')
      .attr('d', (d: any) =>
        this.line(d.values))
      .style('stroke', (d: any) => this.z(d.id));

    sensorin.append('text')
      .datum(function (d: any) {
        return {id: d.id, value: d.values[d.values.length - 1]};
      })
      .attr('transform', (d: any) =>
        'translate(' + this.x(d.value.date) + ',' + this.y(d.value.sensorData) + ')')
      .attr('x', 3)
      .attr('dy', '0.35em')
      .style('font', '10px sans-serif')
      .text(function (d: any) {
        return d.id;
      });
  }

}
