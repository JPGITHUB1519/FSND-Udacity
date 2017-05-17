import os

def rename_files():
	# get filenames from a folder
	file_list = os.listdir(r"prank")
	saved_path = os.getcwd()
	print "Current Working Directory: " + saved_path
	os.chdir("prank")
	# for each file rename it!
	for file_name in file_list:
		print "Old Name - " + file_name
		print "New Name - " + file_name.translate(None, "0123456789")
		os.rename(file_name, file_name.translate(None, "0123456789"))
	os.chdir(saved_path)

rename_files()