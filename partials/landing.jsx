import React from 'react'
import { get } from 'lodash';
import classNames from 'classnames';
import { connect } from "react-redux";
import Button from '../components/button';
import Title from '../components/title';

import { 
    join, 
    addPersonalData, 
    addWorkData, 
    submitData, 
    goToLunch,
    reset } from '../store/actions';

class Progress extends React.Component {
    render() {
        let { stage } = this.props;
        switch(stage) {
            case 1:
            case 2: 
            case 3: 
                return (<ul id="progressbar">
                    <li className={classNames({ active: stage === 1 })}>Personal Details</li>
                    <li className={classNames({ active: stage === 2 })}>Work Details</li>
                    <li className={classNames({ active: stage === 3 })}>Lunch Time!</li>
                </ul>)
            default:
                return (<ul id="progressbar">
                    <li className={classNames({ active: stage === 0 })}>Let's Do Lunch!</li>
                    <li className={classNames({ active: stage === -1 })}>Lunch Time!</li>
                </ul>)
        }
    }
}

class Input extends React.Component {
    render() {
        return(<input 
            type="text" 
            name={this.props.name} 
            value={this.props.value || ''}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}/>)
    }
}

class FieldSet extends React.Component {
    state = {
        data: {
            
        }
    }
    render() {
        let { stage } = this.props;
        switch(stage) {
            case 1:
                return (<fieldset>
                    <Title primary="Employee Details" secondary="Who is it?"/>
                    <Input name="fname" 
                        value={this.state.data.fname} 
                        placeholder="First Name" 
                        onChange={(e) =>
                            this.setState({ data: { ...this.state.data, fname: e.target.value} })
                        } />
                    <Input name="lname" 
                        value={this.state.data.lname} 
                        placeholder="Last Name" 
                        onChange={(e) =>
                            this.setState({ data: { ...this.state.data, lname: e.target.value} })
                        } />
                    <Button name="lunch" className="previous" value="Cancel" onClick={this.props.reset}/>
                    <Button name="user" className="next" value="Next" onClick={() => this.props.addPersonalData(this.state.data)}/>
                </fieldset>
                )
            case 2: 
                return (<fieldset>
                    <Title primary="Work Details" secondary="What do they do?"/>
                    <div>
                        <strong>Name: </strong>
                        <span>{this.state.data.fname} {this.state.data.lname}</span>
                    </div>
                    <Input name="email" 
                        value={this.state.data.email} 
                        placeholder="Email" 
                        onChange={(e) =>
                            this.setState({ data: { ...this.state.data, email: e.target.value} })
                        } />
                    <Input name="dname" 
                        value={this.state.data.dname} 
                        placeholder="Department" 
                        onChange={(e) =>
                            this.setState({ data: { ...this.state.data, dname: e.target.value} })
                        } />
                    <Button name="lunch" className="previous" value="Cancel" onClick={this.props.reset}/>
                    <Button name="user" className="next" value="Next" onClick={() => this.props.addWorkData(this.state.data)}/>
                </fieldset>)
            case 3: 
                return (<fieldset>
                    <Title primary="Lunch Time!" secondary="Are you sure?"/>
                    <div>
                        <strong>Name: </strong>
                        <span>{this.state.data.fname} {this.state.data.lname}</span>
                    </div>
                    <div>
                        <strong>Email: </strong>
                        <span>{this.state.data.email}</span>
                    </div>
                    <div>
                        <strong>Department: </strong>
                        <span>{this.state.data.dname}</span>
                    </div>
                    <Button name="lunch" className="previous" value="Cancel" onClick={this.props.reset}/>
                    <Button name="user" className="submit" value="Submit" onClick={() => this.props.submitData(this.state.data) && this.setState({ data: {} })}/>
                </fieldset>)
            case -1:
                return (<fieldset>
                    <Title primary="Groups Assigned" secondary="Lunch Time!"/>
                    { this.props.groups.map((group, index) => 
                        <div className="col-md-6 col-s-12" key={index} class="group">
                            <h2>Group {index + 1}</h2>
                            { group.map(person =>
                                <div key={JSON.stringify(person)} class="person">
                                    <div>
                                        <strong>Name: </strong>
                                        <span>{person.fname} {person.lname}</span>
                                    </div>
                                    <div>
                                        <strong>Email: </strong>
                                        <span>{person.email}</span>
                                    </div>
                                    <div>
                                        <strong>Department: </strong>
                                        <span>{person.dname}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <Button name="lunch" className="previous" value="Done" onClick={this.props.reset}/>
                </fieldset>)

            default:
                return (<fieldset>
                    <Title primary="Let's Do Lunch!" secondary="What's the plan?"/>
                    <Button name="lunch" className="previous" value="Go To Lunch!" onClick={this.props.goToLunch}/>
                    <Button name="user" className="next" value="Join!" onClick={this.props.join}/>
                </fieldset>)
        }
    }
} 

class Wrapper extends React.Component {
    render() {
        return (<div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form id="msform">
            { this.props.children }
          </form>
        </div>
      </div>);
    }
}

class Landing extends React.Component {
  render() {
    return(<Wrapper>
        <div>
            <Progress stage={this.props.stage} />
            <FieldSet {...this.props} />
        </div>
    </Wrapper>)
  }
}

const mapStateToProps = (state) => {
    let groups = [
        [
            {
                fname: "Mary",
                lname: "Lamb",
                dname: "Marketing",
                email: "mary.lamb@company.com"
            },
            {
                fname: "John",
                lname: "Miller",
                dname: "Sales",
                email: "john.miller@company.com"
            },
            {
                fname: "James",
                lname: "Johnson",
                dname: "Marketing",
                email: "james.johnson@company.com"
            },
            {
                fname: "Mike",
                lname: "Reilly",
                dname: "IT",
                email: "mike.reilly@company.com"
            },
            {
                fname: "Juan",
                lname: "Cena",
                dname: "IT",
                email: "juan.cena@company.com"
            }
        ],
        [
            {
                fname: "Mary",
                lname: "Lamb",
                dname: "Marketing",
                email: "mary.lamb@company.com"
            },
            {
                fname: "John",
                lname: "Miller",
                dname: "Sales",
                email: "john.miller@company.com"
            },
            {
                fname: "James",
                lname: "Johnson",
                dname: "Marketing",
                email: "james.johnson@company.com"
            },
            {
                fname: "Mike",
                lname: "Reilly",
                dname: "IT",
                email: "mike.reilly@company.com"
            }
        ],
        [
            {
                fname: "Mary",
                lname: "Lamb",
                dname: "Marketing",
                email: "mary.lamb@company.com"
            },
            {
                fname: "John",
                lname: "Miller",
                dname: "Sales",
                email: "john.miller@company.com"
            },
            {
                fname: "James",
                lname: "Johnson",
                dname: "Marketing",
                email: "james.johnson@company.com"
            }
        ]
    ];
    return {
      stage: get(state, 'stage', 0),
      groups: get(state, 'groups', [])
    }
}
  
const mapDispatchToProps = { join, addPersonalData, addWorkData, submitData, goToLunch, reset }
  

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Landing)