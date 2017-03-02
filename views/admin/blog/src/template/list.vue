<template>
  <div id="blogList">
    <div class="container">
			<div class="col-md-6 col-md-offset-3" id="app">
				<h1 class="text-center">Blog list</h1>
				<a href="detail.html">
					<div class="panel panel-default blog-list" v-for="article in articles">
					  <div class="panel-body">
					    <h3 class="mt10">{{article.title}}</h3>
					    <p>{{article.content}}...</p>
					  </div>
					</div>
				</a>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article:{
				id: 0,
				title: '',
				content: ''
			},
			articles:[{
				id:1,
				title: 'Today',
				content: 'content content content content content content '
			},{
				id:2,
				title: 'The beauty of CSS',
				content: 'content content content content content content '
			},{
				id:3,
				title: 'php is the best language of the program world',
				content: 'best best best best best best best best'
			},{
				id:4,
				title: 'Can H5 replace apps?',
				content: 'xxxxxxxxxxxxxxxxxxxx'
			}]
    }
  }
}
</script>