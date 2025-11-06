import React from 'react'

const Spinner = () => {
  return (
     <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
                  <p className="mt-8 text-gray-600">Loading services...</p>
                </div>
  )
}

export default Spinner