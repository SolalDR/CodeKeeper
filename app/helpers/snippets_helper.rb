module SnippetsHelper
  def privateLib(privateAttr)
    if privateAttr
      "private"
    else
      "public"
    end
  end
end
