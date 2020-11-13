import React, { useEffect, useState } from 'react';
import app from '../../services/firebase';
import 'firebase/database';
import './css/style.css';

const CoronaNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const db = app.database().ref('news');
    db.on('value', (snapshot) => {
      const firebaseNews = snapshot.val();
      setNews(firebaseNews.data);
      setIsLoading(false);
    });
  }, []);

  console.log(news);

  return (
    <div>
      <h2>data corona</h2>
      {news.map((e) => (
        <table>
          <tr>
            <th>
              <p>{e.id}</p>
            </th>
          </tr>
          <tr>
            <th>
              <p>{e.activity[0].title}</p>
            </th>
          </tr>
          <tr>
            <th>
              <p>{e.activity[0].desc}</p>
            </th>
          </tr>
          <tr>
            <th>
              <p>{e.activity[0].url}</p>
            </th>
          </tr>
        </table>
      ))}
      {isLoading ? <p>loading</p> : <p>data</p>}
    </div>
  );
};

export default CoronaNews;
