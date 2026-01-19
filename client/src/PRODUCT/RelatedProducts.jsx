  import React from 'react';
import HomeCard from '../pages/HomeCard';

const RelatedProducts = ({ products }) => {
  return (
    <section className='py-3 bg-light'>
      <div className='container px-4 px-lg-5 mt-3'>
        <h2 className='fw-bolder md-4'>Related products</h2>
        <div className='row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justyfy-content-center'>
          {products && products.length > 0 ? (
            products.map(product => (
              <HomeCard
                key={product.id}
                title={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                slug={product.slug}
              />
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
