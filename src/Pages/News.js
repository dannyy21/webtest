import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Skeleton } from 'antd'
import axios from 'axios'

const App = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const api = `https://newsapi.org/v2/everything?q=apple&from=2023-02-27&to=2023-02-27&sortBy=popularity&apiKey=dca51ddc2f3e42a8953264d04a0ecaad`
  useEffect(() => {
    setLoading(true)
    axios
      .get(api)
      .then(res => {
        setNews(res.data.articles)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [api])

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        {loading ? (
          <Skeleton active />
        ) : (
          news.map((article, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={8} xl={8}>
              <Card
                hoverable
                style={{ height: '100%' }}
                cover={
                  <img
                    alt={article.title}
                    src={
                      article.urlToImage
                        ? article.urlToImage
                        : 'https://via.placeholder.com/150x150?text=No+Image'
                    }
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                }
              >
                <Card.Meta
                  title={
                    <a href={article.url} target='_blank' rel='noreferrer'>
                      {article.title}
                    </a>
                  }
                  description={article.description}
                />
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  )
}

export default App
