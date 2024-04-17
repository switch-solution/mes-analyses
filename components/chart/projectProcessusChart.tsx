"use client"
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function ProjectChart({ data }: { data: {}[] }) {

    class ProjectChart extends PureComponent {

        render() {
            return (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="En attente" stackId="a" fill="#8884d8" />
                        <Bar dataKey="Terminé" stackId="a" fill="#FF5733" />
                        <Bar dataKey="Réouvert" stackId="a" fill="#33FF57" />
                        <Bar dataKey="En cours de validation" stackId="a" fill="#FF33A1" />
                        <Bar dataKey="En cours de traitement" stackId="a" fill="#A133FF" />
                    </BarChart>
                </ResponsiveContainer>
            );
        }
    }

    return <ProjectChart />

}

