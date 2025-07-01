import React from 'react'
import Category from './Category'

const Categories = ({ data }: any) => {
  return (
    <div className="flex gap-6 mb-8">
      {data && (
        data.data.map((item: any) => (
          <div key={item.id}>
            <Category cat={item} />
          </div>
        ))
      )}
    </div>
  )
}

export default Categories