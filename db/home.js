const db=require('./connection')
exports.homeQuery=async() =>{
    const result1 =await db.query(`WITH ranked_products AS (
        SELECT
          ID,
          NAME,
          BASE_PRICE,
          DISCOUNT,
          RATING,
          CATEGORY,
          SUBCATEGORY,
          BRAND,
          STOCK,
          ROW_NUMBER() OVER (PARTITION BY CATEGORY ORDER BY RATING DESC) AS rn
        FROM geturtech.PRODUCTS
      )
      SELECT
        rp.ID,
        rp.NAME,
        rp.BASE_PRICE,
        rp.DISCOUNT,
        rp.RATING,
        rp.CATEGORY,
        rp.SUBCATEGORY,
        rp.BRAND,
        rp.STOCK,
        i.IMG_URL
      FROM ranked_products AS rp
      JOIN geturtech.IMAGES AS i ON rp.ID = i.PRODUCT_ID
      WHERE rp.CATEGORY IN ('Laptop', 'Monitor')
        AND rp.rn <= 4
        AND i.IMG_URL LIKE '%img1.jpg%';
    `)
    const result2=await db.query(`SELECT CATEGORY,SUBCATEGORY,BRAND FROM geturtech.PRODUCTS`)
    const result3=await db.query(`WITH RankedProducts AS (
        SELECT *
        FROM geturtech.products
        ORDER BY discount DESC
    )
    SELECT *
    FROM (
        SELECT P.*, I.*
        FROM RankedProducts AS P
        JOIN geturtech.IMAGES AS I ON P.ID = I.PRODUCT_ID
        WHERE I.IMG_URL LIKE '%img1.jpg%'
        LIMIT 8
    ) AS result;
    `)
    const result4=await db.query(`WITH monitor_products AS (
        SELECT *
        FROM geturtech.products
        WHERE category = 'Monitor' AND base_price = 0
        ORDER BY category
        LIMIT 4
      ),
      component_products AS (
        SELECT *
        FROM geturtech.products
        WHERE category = 'Component' AND base_price = 0
        ORDER BY category
        LIMIT 4
      )
      SELECT p.*, i.*
      FROM (
        SELECT *
        FROM monitor_products
        UNION ALL
        SELECT *
        FROM component_products
      ) AS p
      JOIN geturtech.images i ON p.id = i.product_id
      WHERE i.img_url LIKE '%img1.jpg%';
      `)
      //console.log(result1.rows);
        const result={
            result1:result1.rows,
            result2:result2.rows,
            result3:result3.rows,
            result4:result4.rows
      }

      return result;
}