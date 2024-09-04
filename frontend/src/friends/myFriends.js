import React, { useState, useEffect } from 'react';
import '../App.css';
import { Form, Table, FormGroup, Label, Input, Button } from 'reactstrap';


export default function MyFriends(){

    return (
        <div className="admin-page-container">
          
            <div>
                        <Table aria-label="onlineGames" className="table-western">
                            <thead >
                                <tr className='entrada-tabla'>
                                    <th className="table-western">Friends</th>
                                    <th className="table-western">Pending requests</th>
                                    <th className="table-western" >Search new friends</th>

                                </tr>
                            </thead>
                            <tbody>
                               
                            
                            </tbody>
                        </Table>
        </div>
        </div>
    );
}