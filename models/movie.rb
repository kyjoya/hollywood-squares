class Movie
  def imdb(title)
    i = Imdb::Search.new(title)
    movie_id = []
    movie_id << i.movies[0].id
    movie_information = Imdb::Movie.new(movie_id[0])

    cast = []
    cast << movie_information.cast_members[0..8]

    cast[0]
  end

  def wikipedia(cast)
    photo = []
    cast.each do |member|
      cast_member_information = Wikipedia.find(member)
      if cast_member_information.image_urls[0] == nil
        i = google_search(member)
        photo << i
      else
        photo << cast_member_information.image_urls[0]
      end
    end
    photo
  end

  def google_search(cast_member)
    @photo = Google::Search::Image.new
    @photo.query = cast_member
    count = 0
    @photo.each do |result|
      @google_photo_url = result.uri
      break if count > 1
      count += 1
    end
    @google_photo_url
  end
end
