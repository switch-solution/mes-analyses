"use client";
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import dynamic from "next/dynamic";

//https://github.com/diegomura/react-pdf/issues/2599

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <p>Chargement...</p>,
    },
);
// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});



// Create Document Component
export const Pdf = ({
    title,
    subtitle,
    author,
    datas
}: {
    title: string,
    subtitle: string,
    author: string,
    datas: { label: string, value: string }[]
}) => {
    return (
        <div className='size-full'>
            <PDFViewer width="100%" height="100%">
                <Document>
                    <Page style={styles.body}>
                        <Text style={styles.header} fixed>
                            ~ Created with react-pdf ~
                        </Text>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.author}>{author}</Text>
                        <Text style={styles.subtitle}>
                            {subtitle}
                        </Text>
                        {datas.map(data => {
                            return (
                                <Text style={styles.text} key={data.label}>{data.label}: {data.value}  </Text>
                            )

                        })}
                        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                            `${pageNumber} / ${totalPages}`
                        )} fixed />
                    </Page>
                </Document>
            </PDFViewer>
        </div>

    )
}