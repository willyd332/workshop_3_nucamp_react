import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {

  constructor(props) {
      super(props);
      this.state = {
          campsites: CAMPSITES,
          comments: COMMENTS,
          partners: PARTNERS,
          promotions: PROMOTIONS
      };
  }

  render() {

    const CampsiteWithId = ({match}) => {
      return (
          <CampsiteInfo 
              campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
              comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
          />
      );
    };    

    const HomePage = () => {
      return (
          <Home
              campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
              promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
              partner={this.state.partners.filter(partner => partner.featured)[0]}
            />
        );
    };

    const AboutPage = () => {
      return (
          <About
            partners={this.state.partners}
          />
        );
    };

      return (
          <div>
              <Header />
              <Switch>
                  <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/aboutus' component={AboutPage} />
                  <Route exact path='/contactus' component={Contact} />
                  <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
                  <Redirect to='/home' />
              </Switch>
              <Footer />
          </div>
      );
  }
}

export default Main;