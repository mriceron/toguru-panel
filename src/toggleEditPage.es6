import React from 'react'

import { Template } from './components/template.es6'

export const ToggleEditPage = () => (
  <Template pageName='toggles'>
    <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
              <div className="card">
                  <div className="header">
                      <h4 className="title">Edit Toggle</h4>
                  </div>
                  <div className="content">
                      <form>
                          <div className="row">
                              <div className="col-md-5">
                                  <div className="form-group">
                                      <label>Toggle ID</label>
                                      <input type="text" className="form-control" disabled placeholder="Company" value="oem-ncd-gallery-form-toggle"/>
                                  </div>
                              </div>
                              <div className="col-md-4">
                                  <div className="form-group">
                                      <label for="exampleInputEmail1">Name</label>
                                      <input type="text" className="form-control" placeholder="Name" value="Toguru demo toggle"/>
                                  </div>
                              </div>
                              <div className="col-md-3">
                                  <div className="form-group">
                                      <label>Rollout percentage</label>
                                      <input type="number" className="form-control" placeholder="Rollout percentage" value="20"/>
                                  </div>
                              </div>
                          </div>

                          <div className="row">
                              <div className="col-md-12">
                                  <div className="form-group">
                                      <label>Description</label>
                                      <input type="text" className="form-control" placeholder="Description" value="Toguru demo toggle"/>
                                  </div>
                              </div>
                          </div>

                          <div className="row">
                              <div className="col-md-12">
                                  <div className="form-group">
                                      <label>Attributes JSON</label>
                                      <textarea rows="5" className="form-control" placeholder='{ "culture": [ "de-DE", "DE" ] }'></textarea>
                                  </div>
                              </div>
                          </div>

                          <div className="row">
                              <div className="col-md-12">
                                  <div className="form-group">
                                      <label>Tags JSON</label>
                                      <textarea rows="5" className="form-control" placeholder='{ "team": "Toguru team" }'></textarea>
                                  </div>
                              </div>
                          </div>

                          <button type="submit" className="btn btn-success btn-fill pull-right">Update</button>
                          <button type="submit" className="btn btn-danger btn-fill pull-right delete-toggle">Delete</button>
                          <div className="clearfix"></div>
                      </form>
                  </div>
              </div>
          </div>

          <div className="col-md-4">
            <div className="card">
                <div className="header">
                    <h4 className="title">Actions</h4>
                </div>
                <div className="content">
                  <div className="row">
                      <div className="col-md-12">
                          <div className="form-group">
                              <label>Local override</label>
                              <select className="form-control">
                                <option>Do not override</option>
                                <option>Always enabled</option>
                                <option>Always disabled</option>
                              </select>
                          </div>
                      </div>
                  </div>
                </div>
             </div>
          </div>

        </div>
    </div>
  </Template>
)
