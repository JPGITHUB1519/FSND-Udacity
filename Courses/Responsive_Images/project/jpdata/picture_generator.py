import glob
import os

base_image_dir = "C:\Users\Tester\Desktop\FSND-Udacity\Courses\Responsive_Images\project\images_src"
os.chdir(base_image_dir)

filenames = glob.glob("*.jpg")

opts = {"image_names": filenames}


for image in filenames:
    image = image[0: len(image) - 4]
    opts = {"image_name": image}
    string = """
	<picture>
	      <source media="(min-width: 750px)" srcset="images/%(image_name)s-1600_large_2x.jpg 2x, images/%(image_name)s-800_large_1x.jpg" />
	      <source media="(min-width: 500px)" srcset="images/%(image_name)s-medium.jpg" />
	      <img src="images/%(image_name)s-small.jpg" alt="Vase, fruit bowl and other objects on a cupboad">
	</picture>
	"""
    print string % opts
