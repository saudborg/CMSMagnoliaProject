[#assign title = content.title!"Java Web Developer - CMS Development (m/f)"]
[#assign location = content.location!"Berlin, Germany"]
[#assign description = content.description!"commercetools is a 100% subsidiary of REWE Digital and works in many projects close together with the mother company. You are looking forward to develop and improve existing CMS solutions as well as to push the development to an integrated enterprise CMS environment within the REWE Group? You are a passionate Java Developer with high quality standards and - on top - solid experience in CMS development and customization of CMS solutions such as Magnolia or Hippo? We're looking forward to meeting you soon! Become part of our international, agile team and work with us on challenging e-commerce projects!"]

<!DOCTYPE html>
<html lang="en">
  <head>
      <title>Commerce Tools</title>
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Raleway:200" type="text/css">
      <link rel="stylesheet" href="${ctx.contextPath}/.resources/commerceToolsModule/webresources/css/style.css">
      [@cms.page /]
   </head>
      
    <div class="job-ad-banner-container">
      <div class="job-ad-banner-content">
        <h1 class="job-ad-title">${model.uppercaseTitle}</h1>
        <h4 class="job-ad-location">${location}</h4>
        <ul class="social-buttons">
        </ul>
      </div>
    </div>
  </div>
  <div class="job-ad-description">
    <!-- short description -->
    <div class="job-ad-short-desc job-ad-text clearfix-wysiwyg">${description}
    </div>
  </div>
  

  </body>
</html>
