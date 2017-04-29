module ProfileHelper
  def display_if_exist(content)
    if content
      content
    end
  end

  def format_url(url)
    if /https?:\/\//.match(url)
      url
    else
      new_url = "http://"+url
      new_url
    end
  end
end
