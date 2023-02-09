import { Helmet } from 'react-helmet'
import React from 'react'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Eshop',
  description: '...',
  keywords: '...',
}

export default Meta
