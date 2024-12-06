import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/1ZVVYm-66O53BIuobArrw89BpV6-dGFYt5f_cuZEfmKc/values/Sheet1!A2:E?key=AIzaSyBewXORY3j8C7nuG1_RNc3uPvvLsq2ft68`
        );
        const rows = response.data.values;
        const data = rows.map((row) => ({
          title: row[0],
          startDate: row[1],
          registrationDate: row[2],
          endDate: row[3],
          category: row[4],
        }));
        setCompetitions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Daftar Kompetisi</h1>
      <ul>
        {competitions.map((comp, index) => (
          <li key={index}>
            <strong>{comp.title}</strong><br />
            Start Date: {comp.startDate} | Registration: {comp.registrationDate} | End Date: {comp.endDate}<br />
            Category: {comp.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Competitions;


const [searchTerm, setSearchTerm] = useState('');

const filteredCompetitions = competitions.filter(comp =>
  comp.title.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
  <div>
    <input
      type="text"
      placeholder="Cari lomba..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <ul>
      {filteredCompetitions.map((comp, index) => (
        <li key={index}>
          <strong>{comp.title}</strong>
        </li>
      ))}
    </ul>
  </div>
);

