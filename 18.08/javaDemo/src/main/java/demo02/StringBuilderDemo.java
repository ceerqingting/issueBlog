package demo02;

public class StringBuilderDemo {
    public void testBuilderFun() {
        StringBuilder str = new StringBuilder("hello");
        str.append(" imooc");
        str.append(520);
        System.out.println("字符串长度：" + str.length());
        System.out.println("插入前：" + str);

        str.insert(11, "!");
        String str2 = str.toString();
        System.out.println("插入后：" + str2);
    }
    public void test() {
        StringBuilder str1 = new StringBuilder();
        StringBuilder str2 = new StringBuilder("imooc");
        System.out.println(str2);
    }
    public static void main(String[] args) {
        StringBuilderDemo sd = new StringBuilderDemo();
//        sd.test();
        sd.testBuilderFun();
    }
}
