import { useEffect, useState } from 'react'
import '../../assets/Sidebar.scss'
import db from '../../Database'

export default ({ onCategoryChange, onSubCategoryChange }) => {
  const [categories, setCategories] = useState(null)
  const [subCategories, setSubCategories] = useState(null)

  useEffect(() => {
    ;(async function () {
      setCategories(await db.getCategories())
      setSubCategories(await db.getSubCategories())
    })()
  }, [])

  return (
    <aside className="sidebar">
      <article className="scrollable">
        <section className="categories">
          <h5>Categories</h5>
          {categories ? (
            <ul>
              {categories.map((category, index) => (
                <li key={index}>
                  <input type="checkbox" id={`categoryCheck${index}`} />
                  &nbsp;
                  <label htmlFor={`categoryCheck${index}`}>
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <div aria-busy="true"></div>
          )}
        </section>
        <section className="categories">
          <h5>Sub-Categories</h5>
          {subCategories ? (
            <ul>
              {subCategories.map((subCategory, index) => (
                <li key={index}>
                  <input id={`subCategoryCheck${index}`} type="checkbox" />
                  &nbsp;
                  <label htmlFor={`subCategoryCheck${index}`}>
                    {subCategory.name}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <div aria-busy="true"></div>
          )}
        </section>
      </article>
    </aside>
  )
}
