import React, { useEffect, useState } from 'react'
import '../../assets/Sidebar.scss'
import db from '../../Database'
import { ICategory, ISubCategory } from '../../types/Collections'

interface Props {
  onCategoryChange: (category: ICategory, active: boolean) => any
  onSubCategoryChange: (category: ISubCategory, active: boolean) => any
}

const Sidebar: React.FC<Props> = ({ onCategoryChange, onSubCategoryChange }) => {
  const [categories, setCategories] = useState<ICategory[]>()
  const [subCategories, setSubCategories] = useState<ISubCategory[]>()

  useEffect(() => {
    ;(async function () {
      setCategories(await db.getCategories())
      setSubCategories(await db.getSubCategories())
    })().catch(err => console.log(err))
  }, [])

  return (
    <aside className="sidebar">
      <article className="scrollable">
        <section className="categories">
          <h5>Categories</h5>
          {(categories != null)
            ? (
            <ul>
              {categories.map((category, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      onCategoryChange(category, e.target.checked)
                    }
                    id={`categoryCheck${index}`}
                  />
                  &nbsp;
                  <label htmlFor={`categoryCheck${index}`}>
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>
              )
            : (
            <div aria-busy="true"></div>
              )}
        </section>
        <section className="categories">
          <h5>Sub-Categories</h5>
          {(subCategories != null)
            ? (
            <ul>
              {subCategories.map((subCategory, index) => (
                <li key={index}>
                  <input
                    id={`subCategoryCheck${index}`}
                    onChange={(e) =>
                      onSubCategoryChange(subCategory, e.target.checked)
                    }
                    type="checkbox"
                  />
                  &nbsp;
                  <label htmlFor={`subCategoryCheck${index}`}>
                    {subCategory.name}
                  </label>
                </li>
              ))}
            </ul>
              )
            : (
            <div aria-busy="true"></div>
              )}
        </section>
      </article>
    </aside>
  )
}

export default Sidebar
