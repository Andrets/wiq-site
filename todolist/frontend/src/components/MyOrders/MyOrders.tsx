import React, { FC, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Cookies from 'cookies-js';


interface TableData {
    quantity: number,
    link: string,
    service: number,
    remains: number,
    status: string,
    start_count: number,
    charge: number,
    currency: string,
}

interface OrderData {
    [orderID: string]: TableData
}

export const MyOrders:FC = () => {
    const [tableData, setTableData] = useState<OrderData | null>(null);

    useEffect(() => {
        fetch('/api/wiq/order-status')
        .then((response) => {
            if (response.status === 200) {
                response.json()
                .then((data) => {
                    setTableData(data)
                })
            } else {
                null
            }
        })
        .catch((error) => {
            console.log('error', error)
        })
    }, [])

    const handleOnRemove = (oderID: string) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order: oderID,
            })
        }
        fetch('/api/wiq/cancel-order', requestOptions)
        .then((response) => {
            if (response.status === 200) {
                console.log('success')
            } else {
                console.log('failed')
            }
        })
    }

    const handleOnRefill = (orderID: string) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                order: orderID
            })
        }
        fetch('/api/wiq/refill-order', requestOptions)
        .then((response) => {
            if (response.status === 200) {
                console.log('sucess refill')
            } else {
                console.log('error while refilling')
            }
        })
    }

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Service</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Start Count</TableCell>
                            <TableCell>Remains</TableCell>
                            <TableCell>Charge</TableCell>
                            <TableCell>Currency</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Refill</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { tableData && Object.keys(tableData).map((orderID) => (
                            <TableRow key={orderID}>
                                <TableCell>{tableData[orderID].service}</TableCell>
                                <TableCell>{tableData[orderID].link}</TableCell>
                                <TableCell>{tableData[orderID].quantity}</TableCell>
                                <TableCell>{tableData[orderID].start_count}</TableCell>
                                <TableCell>{tableData[orderID].remains}</TableCell>
                                <TableCell>{tableData[orderID].charge}</TableCell>
                                <TableCell>{tableData[orderID].currency}</TableCell>
                                <TableCell>{tableData[orderID].status}</TableCell>
                                <TableCell>
                                    <Button variant='outlined' onClick={() => handleOnRemove(orderID)}>
                                        Cancel
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant='outlined' onClick={() => handleOnRefill(orderID)}>
                                        Refill
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}