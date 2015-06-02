require "sinatra/reloader"
require 'pry'
require 'sinatra'
require 'sinatra/json'
require 'json'
require 'imdb'
require 'wikipedia'
require 'google-search'

require_relative 'models/movie'

get '/' do
  erb :index
end

get '/movie.json' do
  @movie = params["movie"]
  content_type :json

  movie = Movie.new
  cast = movie.imdb(@movie)
  photos = movie.wikipedia(cast)


  { cast: cast, photos: photos }.to_json
end
