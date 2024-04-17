"use client"
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function ProjectProcessusChart({ data }: { data: {}[] }) {



    class ProjectChart extends PureComponent {
        static demoUrl = 'https://codesandbox.io/s/tiny-bar-chart-35meb';

        render() {
            return (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={150} height={40} data={data} barGap={3}>
                        <Bar dataKey="isOpen" fill="#82ca9d" />
                        <Bar dataKey="isPending" fill="#FA8072" />
                        <Bar dataKey="isApproved" fill="#8884d8" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                    </BarChart>
                </ResponsiveContainer>
            );
        }
    }

    return <ProjectChart />

}

