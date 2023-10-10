class ResultsController < ApplicationController
  def index
    results = FinalResult.all
    render json: results.to_json
  end
end
