import React from 'react'
import '../../assets/Sidebar.scss'
import {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery
} from '../../services/Backend'
import { ICategory, ISubCategory } from '../../types/Collections'

interface Props {
  onCategoryChange: (category: ICategory, active: boolean) => any
  onSubCategoryChange: (category: ISubCategory, active: boolean) => any
}

const Sidebar: React.FC<Props> = ({
  onCategoryChange,
  onSubCategoryChange
}) => {
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading
  } = useGetAllCategoriesQuery(null)
  const {
    data: subCategories,
    error: subCategoriesError,
    isLoading: subCategoriesLoading
  } = useGetAllSubCategoriesQuery(null)

  return (
    <aside className="sidebar">
      <article className="scrollable">
        <section className="categories">
          <h5>Categories</h5>
          {categoriesLoading
            ? (
            <div aria-busy="true"></div>
              )
            : categoriesError != null
              ? (
            <div>Couldn&apos;t fetch categories!</div>
                )
              : (
            <ul>
              {categories?.map((category: ICategory, index: number) => (
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
                )}
        </section>
        <section className="categories">
          <h5>Sub-Categories</h5>
          {subCategoriesLoading
            ? (
            <div aria-busy="true"></div>
              )
            : subCategoriesError != null
              ? (
            <div>Couldn&apos;t fetch sub categories!</div>
                )
              : (
            <ul>
              {subCategories?.map((subCategory: ISubCategory, index: number) => (
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
                )}
        </section>
      </article>
    </aside>
  )
}

export default Sidebar
