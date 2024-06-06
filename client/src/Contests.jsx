import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import imageMap from './imageMap';

const Contests = () => {

    const [contest, setContests] = useState([]);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('event');


    useEffect( () => {

        const fetchContests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/contests');
                setContests(response.data);
            } catch (error) {
                console.error('Error fetching contests:', error);
            }
        }

        fetchContests();
    }, []);

  return (
    <div className="container mx-auto py-10 px-4">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contest.map((contest) => (
                    <div key={contest.id} className="bg-white shadow-lg rounded-lg p-6">
                        <div className="flex items-center">
                            <img 
                                src={imageMap[contest.resource.name.toLowerCase()] || '/images/default.png'} 
                                alt={contest.resource.name} 
                                className="w-16 h-16 rounded-full mr-4" 
                            />
                            <div>
                                <h2 className="text-xl font-bold">
                                    <Link to={`/contests/${contest.id}`} className="hover:underline">{contest.event}</Link>
                                </h2>
                                <p className="text-gray-600">{contest.resource.name}</p>
                                <p className="text-gray-600">
                                    Start: {new Date(contest.start).toLocaleString()}
                                </p>
                                <p className="text-gray-600">
                                    End: {new Date(contest.end).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Contests;