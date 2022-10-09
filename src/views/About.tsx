import Layout from '../components/layout/Layout'

const About: React.FC = () => {
  return (
    <Layout>
      <article>
        <h3>ChangeNOW Store</h3>
        <p>
          ChangeNOW Store is an Ecommerce platform where users can purchase
          clothing using{' '}
          <a
            href="https://en.wikipedia.org/wiki/Ripple_(payment_protocol)"
            rel="noreferrer noopener"
          >
            XRP (Ripple)
          </a>
          . It has an ultra simple and intuitive UI -- you should feel right at
          home here.
        </p>
        <p>
          This project has multiple points to it. I embarked on it in order to
        </p>
        <ul>
          <li>
            serve as a test (set by myself) to prepare me for the the role of
            React Developer at ChangeNOW.
          </li>
          <li>
            make use of all the technologies stated on the job requirements.
          </li>
          <li>integrate the ChangeNOW payment API.</li>
        </ul>
        <p>
          During the course of this projects, I also got to learn and apply some
          unexpected technologies. Deploying to my own personal server using
          Git, automating the project project deployment using git hooks and
          then later employing GitHub actions to automate the deployment. These
          were a few new things I got to try out during the course of this
          project.
        </p>
        <p>
          As I conclude, I really like how this project turned out. Most
          especially the growth I went through while working on this project. I
          am looking forward to working on more amazing projects both solo and
          in teams/organizations.
        </p>
      </article>
      <article>
        <hgroup>
          <h3>Contact</h3>
          <h4>Want to reach out to me? Feel free to use the form below</h4>
        </hgroup>
        <form>
          <input type="email" placeholder="Email address" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send</button>
        </form>
      </article>
    </Layout>
  )
}

export default About
